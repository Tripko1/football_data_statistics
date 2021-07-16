import axios from "../../axios-instance";
export default {
  namespaced: true,
  state() {
    return {
      competitions: [],
      selectedId: null,
      selectedName: null,
      menuIsOpen: false,
      isLoading: true,
      errorInit: null,
    };
  },
  mutations: {
    async loadTierOne(state) {
      state.isLoading = true;
      try {
        const response = await axios
          .get("/competitions?plan=TIER_ONE")
          .then((res) => res.data)
          .catch((error) => {
            throw new Error(`${error.response.data.message}`);
          });
        state.competitions = response.competitions;
        state.selectedId = response.competitions[0].id;
        state.selectedName =
          response.competitions[0].area.name +
          " " +
          response.competitions[0].name;
        state.errorInit = null;

        setTimeout(() => {
          state.isLoading = false;
        }, 2000);
      } catch (err) {
        state.errorInit = err;
      }
    },
    setCompetition(state, payload) {
      const id = payload.id;
      const competition = state.competitions.find((c) => c.id === id);
      const name = competition.area.name + " " + competition.name;
      state.selectedId = id;
      state.selectedName = name;
      state.menuIsOpen = false;
    },
    openCloseMenu(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
  },
  actions: {
    loadTierOne_Action(context) {
      context.commit("loadTierOne");
    },
    setCompetition(context, payload) {
      const leaderboardPath = new RegExp("^/leaderboard.*$");
      if (leaderboardPath.test(payload.path)) {
        context.dispatch(
          "lead/getLeaderBoard",
          { id: payload.id },
          { root: true }
        );
      }
      context.commit("setCompetition", payload);
    },
    openCloseModal(context) {
      context.commit("openCloseMenu");
    },
  },
  getters: {
    competitions(state) {
      return state.competitions;
    },
    selectedName(state) {
      return state.selectedName;
    },
    selectedId(state) {
      return state.selectedId;
    },
    menuIsOpen(state) {
      return state.menuIsOpen;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
};
