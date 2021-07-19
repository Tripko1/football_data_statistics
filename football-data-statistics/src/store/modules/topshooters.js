import axios from "../../axios-instance";

const loadShooters = (state, filter) => {
  const shooters = [];
  const start = (state.selectedPage - 1) * state.itemsPerPage;
  let end = start + state.itemsPerPage;
  if (end > state.totalCount) {
    end = state.totalCount;
  }
  let arr = [];
  if (filter === "filter") {
    arr = state.filteredShooters;
  } else {
    arr = state.topShooters;
    state.filteredMatches = [];
  }
  for (let i = start; i < end; i++) {
    const shooter = arr[i];
    shooters.push(shooter);
  }
  state.shootersInView = shooters;
};

const setPagination = (state) => {
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

const sortScorer = (state, arr, selectValue) => {
  const n = arr.length;
  if (n > 0) {
    if (selectValue === 1 && arr[0].numberOfGoals > arr[n - 1].numberOfGoals) {
      for (let i = 0; i < n / 2; i++) {
        const pom = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = pom;
      }
    }

    if (selectValue === 0 && arr[0].numberOfGoals < arr[n - 1].numberOfGoals) {
      for (let i = 0; i < n / 2; i++) {
        const pom = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = pom;
      }
    }
  }
  state.filteredShooters = arr;
  loadShooters(state, "filter");
};

export default {
  namespaced: true,
  state() {
    return {
      topShooters: [],
      shootersInView: [],
      filteredShooters: [],
      totalCount: null,
      errorShooters: null,
      itemsPerPage: 15,
      totalPages: null,
      startPos: 1,
      selectedPage: 1,
      selectedPlayer: null,
    };
  },
  mutations: {
    async loadTopShooters(state, payload) {
      try {
        const id = payload.id;
        const url = "/competitions/" + id + "/scorers?limit=100";
        const response = await axios
          .get(url)
          .then((res) => res.data)
          .catch((error) => {
            throw new Error(`${error.response.data.message}`);
          });
        state.selectedPage = 1;
        state.startPos = 1;
        state.totalCount = response.count;
        state.topShooters = response.scorers;
        state.errorShooters = null;

        setPagination(state);
        loadShooters(state, "no-filter");
      } catch (err) {
        state.errorShooters = err;
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
      if (state.filteredShooters.length > 0) {
        loadShooters(state, "filter");
      } else {
        loadShooters(state, "no-filter");
      }
    },
    async setSelectedPlayer(state, payload) {
      try {
        const id = payload.id;
        const url = "/players/" + id;
        const response = await axios
          .get(url)
          .then((res) => res.data)
          .catch((error) => {
            throw new Error(`${error.response.data.message}`);
          });
        state.errorShooters = null;
        state.selectedPlayer = response;
      } catch (err) {
        state.errorShooters = err;
      }
    },
    filterScorers(state, payload) {
      const searchValue = payload.searchValue;
      let selectValue = payload.selectValue;

      if (selectValue === "") {
        selectValue = 0;
      } else {
        selectValue = +selectValue;
      }
      let s = [];
      if (searchValue.length > 3) {
        state.topShooters.find((shooter) => {
          const name = shooter.player.name !== null ? shooter.player.name : "";
          const nationality =
            shooter.player.nationality !== null
              ? shooter.player.nationality
              : "";
          const position =
            shooter.player.position !== null ? shooter.player.position : "";
          const team = shooter.team.name !== null ? shooter.team.name : "";

          if (
            name.toLowerCase().includes(searchValue) ||
            nationality.toLowerCase().includes(searchValue) ||
            position.toLowerCase().includes(searchValue) ||
            team.toLowerCase().includes(searchValue) ||
            name.toUpperCase().includes(searchValue) ||
            nationality.toUpperCase().includes(searchValue) ||
            position.toUpperCase().includes(searchValue) ||
            team.toUpperCase().includes(searchValue)
          ) {
            s.push(shooter);
          }
        });
        state.totalCount = s.length;
        setPagination(state);
        sortScorer(state, s, selectValue);
      } else {
        state.totalCount = state.topShooters.length;
        setPagination(state);
        sortScorer(state, state.topShooters, selectValue);
      }
    },
  },
  actions: {
    loadTopShooters(context, payload) {
      return context.commit("loadTopShooters", payload);
    },
    increment(context, payload) {
      context.commit("increment", payload);
    },
    decrement(context, payload) {
      context.commit("decrement", payload);
    },
    selectPage(context, payload) {
      context.commit("filterScorers", payload);
      context.commit("selectPage", payload);
    },
    setSelectedPlayer(context, payload) {
      context.commit("setSelectedPlayer", payload);
    },
    filterScorers(context, payload) {
      context.commit("filterScorers", payload);
    },
  },
  getters: {
    getTotalCount(state) {
      return state.totalCount;
    },
    getShootersInView(state) {
      return state.shootersInView;
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
    getSelectedPlayer(state) {
      return state.selectedPlayer;
    },
    getTopShooters(state) {
      return state.topShooters;
    },
    getErrorShooters(state) {
      return state.errorShooters;
    },
  },
};
