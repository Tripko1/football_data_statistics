import { createStore } from "vuex";
import competitionsModule from "./modules/competitions";
import leaderboardModule from "./modules/leaderboard";
import matchesModule from "./modules/matches";

export default createStore({
  modules: {
    comps: competitionsModule,
    lead: leaderboardModule,
    match: matchesModule,
  },
});
