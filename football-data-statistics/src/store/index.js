import { createStore } from "vuex";
import competitionsModule from "./modules/competitions";
import leaderboardModule from "./modules/leaderboard";
import matchesModule from "./modules/matches";
import topshootersModule from "./modules/topshooters";

export default createStore({
  modules: {
    comps: competitionsModule,
    lead: leaderboardModule,
    match: matchesModule,
    top: topshootersModule,
  },
});
