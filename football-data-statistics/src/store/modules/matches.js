import axios from "../../axios-instance";

const loadMatches = (state, filter) => {
  const matches = [];
  const start = (state.selectedPage - 1) * state.itemsPerPage;
  let end = start + state.itemsPerPage;
  if (end > state.totalCount) {
    end = state.totalCount;
  }
  let arr = [];
  if (filter === "filter") {
    arr = state.filteredMatches;
  } else {
    arr = state.matches;
    state.filteredMatches = [];
  }
  for (let i = start; i < end; i++) {
    const match = arr[i];
    matches.push(match);
  }
  state.matchesInView = matches;
};

const setPagintation = (state) => {
  const num = state.totalCount % state.itemsPerPage;
  if (state.totalCount === 0) {
    state.totalPages = 0;
  } else if (num === 0) {
    state.totalPages = state.totalCount / state.itemsPerPage;
  } else if (num > 0) {
    state.totalPages = state.totalCount / state.itemsPerPage + 1;
  }
  if (state.selectedPage > state.totalPages) {
    state.selectedPage = 1;
    state.startPos = 1;
  }
};

export default {
  namespaced: true,
  state() {
    return {
      matches: [],
      matchesInView: [],
      filteredMatches: [],
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
        setPagintation(state);
        loadMatches(state, "no-filter");
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
      if (state.filteredMatches.length === 0) {
        loadMatches(state, "no-filter");
      } else {
        loadMatches(state, "filter");
      }
    },
    filterMatches(state, payload) {
      const searchValue = payload.searchValue;
      let selectValue = payload.selectValue;

      if (selectValue === "") {
        selectValue = -1;
      } else {
        selectValue = +selectValue;
      }

      let m = [];

      if (searchValue.length > 3) {
        state.matches.find((match) => {
          if (
            match.awayTeam.name.toLowerCase().includes(searchValue) ||
            match.homeTeam.name.toLowerCase().includes(searchValue)
          ) {
            if (selectValue === -1) {
              m.push(match);
            } else {
              if (
                match.score.fullTime.homeTeam !== null &&
                match.score.fullTime.homeTeam + match.score.fullTime.awayTeam >=
                  selectValue
              ) {
                m.push(match);
              }
            }
          }
        });
      } else {
        if (selectValue === -1) {
          m = state.matches;
        } else {
          state.matches.find((match) => {
            if (
              match.score.fullTime.homeTeam !== null &&
              match.score.fullTime.homeTeam + match.score.fullTime.awayTeam >=
                selectValue
            ) {
              m.push(match);
            }
          });
        }
      }
      state.filteredMatches = m;
      state.totalCount = m.length;
      setPagintation(state);
      loadMatches(state, "filter");
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
      context.commit("filterMatches", payload);
      context.commit("selectPage", payload);
    },
    filterMatches(context, payload) {
      context.commit("filterMatches", payload);
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
    getAllMatches(state) {
      return state.matches;
    },
  },
};
