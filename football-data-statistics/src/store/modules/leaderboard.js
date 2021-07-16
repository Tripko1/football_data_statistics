import axios from "../../axios-instance";
export default {
  namespaced: true,
  state() {
    return {
      standings: [],
      error: null,
    };
  },
  mutations: {
    async getLeaderBoard(state, payload) {
      try {
        const competitions_id = payload.id;
        const url = "/competitions/" + competitions_id + "/standings";
        const response = await axios
          .get(url)
          .then((res) => res.data)
          .catch((error) => {
            if (error.response.status === 404) {
              throw new Error(`${error.response.data.message}`);
            }
          });
        state.standings = response.standings;
        state.error = null;
      } catch (err) {
        console.log(err);
        state.error = err;
      }
    },
  },
  actions: {
    getLeaderBoard(context) {
      const id = context.rootGetters["comps/selectedId"];
      const payload = { id: id };
      context.commit("getLeaderBoard", payload);
    },
  },
  getters: {
    getStandings(state) {
      return state.standings;
    },
    getError(state) {
      return state.error;
    },
  },
};
