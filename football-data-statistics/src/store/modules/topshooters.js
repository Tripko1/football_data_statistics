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

  if (num === 0) {
    state.totalPages = state.totalCount / state.itemsPerPage;
  } else if (num > 0) {
    state.totalPages = state.totalCount / state.itemsPerPage + 1;
  } else if (state.totalCount === 0) {
    state.totalPages = 0;
  }
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
      const inputValue = payload.inputValue;
      if (inputValue.length > 3) {
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
        state.selectedPlayer = response;
      } catch (err) {
        console.log(err);
      }
    },
    filterScorers(state, payload) {
      const value = payload.value;
      if (value.length > 3) {
        const s = [];
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
            name.toLowerCase().includes(value) ||
            nationality.toLowerCase().includes(value) ||
            position.toLowerCase().includes(value) ||
            team.toLowerCase().includes(value)
          ) {
            s.push(shooter);
          }
        });
        state.filteredShooters = s;
        state.totalCount = s.length;
        setPagination(state);

        if (state.totalPages < state.selectedPage) {
          state.selectedPage = 1;
          state.startPos = 1;
        }
        loadShooters(state, "filter");
      } else {
        state.totalCount = state.topShooters.length;
        setPagination(state);
        if (state.totalPages < state.selectedPage) {
          state.selectedPage = 1;
          state.startPos = 1;
        }
        loadShooters(state, "no-filter");
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
      const inputValue = payload.inputValue;
      if (inputValue.length > 3) {
        context.commit("filterScorers", { value: inputValue });
        context.commit("selectPage", payload);
      } else {
        context.commit("selectPage", payload);
      }
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
  },
};
