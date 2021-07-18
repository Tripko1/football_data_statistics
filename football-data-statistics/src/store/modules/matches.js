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

  if (num === 0) {
    state.totalPages = state.totalCount / state.itemsPerPage;
  } else if (num > 0) {
    state.totalPages = state.totalCount / state.itemsPerPage + 1;
  } else if (state.totalCount === 0) {
    state.totalPages = 0;
  }
};

const getFilteredMatches = (state, arr, selectValue) => {
  state.filteredMatches = [];
  const m = [];
  for (let i = 0; i < arr.length; i++) {
    if (selectValue >= 0) {
      if (
        arr[i].score.fullTime.homeTeam !== null &&
        arr[i].score.fullTime.homeTeam + arr[i].score.fullTime.awayTeam >=
          selectValue
      ) {
        m.push(arr[i]);
      }
    } else {
      m.push(arr[i]);
    }
  }
  state.filteredMatches = m;
  state.totalCount = m.length;
  setPagintation(state);

  if (state.totalPages < state.selectedPage) {
    state.selectedPage = 1;
    state.startPos = 1;
  }
  loadMatches(state, "filter");
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
      const inputValue = payload.inputValue;
      const selectValue = payload.selectValue;
      console.log(selectValue);
      if (inputValue.length > 3) {
        loadMatches(state, "filter");
      } else {
        if (selectValue >= 0) {
          getFilteredMatches(state, state.filteredMatches, selectValue);
        } else {
          loadMatches(state, "no-filter");
        }
      }
    },
    filterMatches(state, payload) {
      const value = payload.value;
      const selectValue = payload.selectValue;

      if (value.length > 3) {
        const m = [];
        state.matches.find((match) => {
          if (
            match.awayTeam.name.toLowerCase().includes(value) ||
            match.homeTeam.name.toLowerCase().includes(value)
          ) {
            m.push(match);
          }
        });
        state.filteredMatches = m;
        state.totalCount = m.length;
        setPagintation(state);

        if (state.totalPages < state.selectedPage) {
          state.selectedPage = 1;
          state.startPos = 1;
        }
        loadMatches(state, "filter");
      } else {
        state.totalCount = state.matches.length;
        setPagintation(state);
        if (state.totalPages < state.selectedPage) {
          state.selectedPage = 1;
          state.startPos = 1;
        }
        loadMatches(state, "no-filter");
      }

      if (selectValue !== "") {
        if (value.length > 3) {
          getFilteredMatches(state, state.filteredMatches, selectValue);
        } else {
          getFilteredMatches(state, state.matches, selectValue);
        }
      }
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
      const inputValue = payload.inputValue;
      if (inputValue.length > 3) {
        context.commit("filterMatches", { value: inputValue });
        context.commit("selectPage", payload);
      } else {
        context.commit("selectPage", payload);
      }
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
  },
};
