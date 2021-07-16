import { createStore } from "vuex";
import competitionsModule from "./modules/competitions";
import leaderboardModule from "./modules/leaderboard";

export default createStore({
  modules: {
    comps: competitionsModule,
    lead: leaderboardModule,
  },
});
