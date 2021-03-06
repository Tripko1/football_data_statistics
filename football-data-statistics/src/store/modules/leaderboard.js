import axios from "../../axios-instance";
export default {
  namespaced: true,
  state() {
    return {
      standings: [],
      error: null,
      selectedTeam: null,
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
            throw new Error(`${error.response.data.message}`);
          });
        state.standings = response.standings;
        state.error = null;
      } catch (err) {
        state.error = err;
      }
    },
    async setSelectedTeam(state, payload) {
      try {
        const id = payload.id;
        const url = "/teams/" + id;
        const response = await axios
          .get(url)
          .then((res) => res.data)
          .catch((error) => {
            throw new Error(`${error.response.data.message}`);
          });
        state.error = null;
        state.selectedTeam = response;
      } catch (err) {
        state.error = err;
      }
    },
  },
  actions: {
    getLeaderBoard(context, payload) {
      context.commit("getLeaderBoard", payload);
    },
    setSelectedTeam(context, payload) {
      context.commit("setSelectedTeam", payload);
    },
  },
  getters: {
    getStandings(state) {
      return state.standings;
    },
    getError(state) {
      return state.error;
    },
    getSelectedTeam(state) {
      return state.selectedTeam;
    },
    getColor1(state) {
      return state.selectedTeam.clubColors.split("/")[0];
    },
    getColor2(state) {
      return state.selectedTeam.clubColors.split("/")[1];
    },
  },
};
