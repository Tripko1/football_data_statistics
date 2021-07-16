import axios from "../../axios-instance";
export default {
  namespaced: true,
  state() {
    return {
      competitions: [],
      selectedId: null,
      selectedName: null,
      menuIsOpen: false,
    };
  },
  mutations: {
    async loadTierOne(state) {
      const response = await axios
        .get("/competitions?plan=TIER_ONE")
        .then((res) => res.data);
      state.competitions = response.competitions;
      state.selectedId = response.competitions[0].id;
      state.selectedName =
        response.competitions[0].area.name +
        " " +
        response.competitions[0].name;
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
  },
};
