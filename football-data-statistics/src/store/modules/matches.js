import axios from "../../axios-instance";

const loadMatches = (state) => {
  const matches = [];
  const start = (state.selectedPage - 1) * state.itemsPerPage;
  let end = start + state.itemsPerPage;
  if (end > state.totalCount) {
    end = state.totalCount;
  }
  for (let i = start; i < end; i++) {
    const match = state.matches[i];
    matches.push(match);
  }
  state.matchesInView = matches;
};

export default {
  namespaced: true,
  state() {
    return {
      matches: [],
      matchesInView: [],
      totalCount: null,
      errorMatches: null,
      itemsPerPage: 15,
      totalPages: null,
      startPos: 1,
      selectedPage: 1,
    };
  },
  mutations: {
    async allMatches(state, payload) {
      try {
        const competitions_id = payload.id;
        const url = "/competitions/" + competitions_id + "/matches";
        const response = await axios
          .get(url)
          .then((res) => res.data)
          .catch((error) => {
            throw new Error(`${error.response.data.message}`);
          });
        state.selectedPage = 1;
        state.startPos = 1;
        state.totalCount = response.count;
        state.matches = response.matches;
        state.errorMatches = null;
        const num = state.totalCount % state.itemsPerPage;

        if (num === 0) {
          state.totalPages = state.totalCount / state.itemsPerPage;
        } else {
          state.totalPages = state.totalCount / state.itemsPerPage + 1;
        }

        loadMatches(state);
      } catch (err) {
        state.errorMatches = err;
      }
    },
    increment(state, payload) {
      const value = payload.value;
      if (state.startPos < state.totalPages - 6) {
        state.startPos += value;
      }
    },
    decrement(state, payload) {
      const value = payload.value;
      if (state.startPos > 1) {
        state.startPos -= value;
      }
    },
    selectPage(state, payload) {
      const value = payload.value;
      state.selectedPage = value;
      loadMatches(state);
    },
  },
  actions: {
    allMatches(context, payload) {
      context.commit("allMatches", payload);
    },
    increment(context, payload) {
      context.commit("increment", payload);
    },
    decrement(context, payload) {
      context.commit("decrement", payload);
    },
    selectPage(context, payload) {
      context.commit("selectPage", payload);
    },
  },
  getters: {
    getTotalCount(state) {
      return state.totalCount;
    },
    getMatchesInView(state) {
      return state.matchesInView;
    },
    getTotalPages(state) {
      const arr = [];
      let endPosition = state.startPos + 5;
      if (endPosition > state.totalPages) {
        endPosition = state.totalPages;
      }
      for (let i = state.startPos; i <= endPosition; i++) {
        arr.push({ value: i });
      }
      return arr;
    },
    getSelectedPage(state) {
      return state.selectedPage;
    },
  },
};
