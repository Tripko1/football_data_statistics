import axios from "../../axios-instance";

const loadShooters = (state) => {
  const shooters = [];
  const start = (state.selectedPage - 1) * state.itemsPerPage;
  let end = start + state.itemsPerPage;
  if (end > state.totalCount) {
    end = state.totalCount;
  }
  for (let i = start; i < end; i++) {
    const shooter = state.topShooters[i];
    shooters.push(shooter);
  }
  state.shootersInView = shooters;
};

export default {
  namespaced: true,
  state() {
    return {
      topShooters: [],
      shootersInView: [],
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
        state.topShooters = response.scorers;
        state.errorShooters = null;
        state.selectedPage = 1;
        state.startPos = 1;
        state.totalCount = response.count;

        const num = state.totalCount % state.itemsPerPage;

        if (num === 0) {
          state.totalPages = state.totalCount / state.itemsPerPage;
        } else {
          state.totalPages = state.totalCount / state.itemsPerPage + 1;
        }
        loadShooters(state);
      } catch (err) {
        console.log(err);
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
      loadShooters(state);
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
      context.commit("selectPage", payload);
    },
    setSelectedPlayer(context, payload) {
      context.commit("setSelectedPlayer", payload);
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
