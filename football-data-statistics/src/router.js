import { createRouter, createWebHistory } from "vue-router";
import TheHome from "./pages/TheHome.vue";
import TheLeaderboard from "./pages/TheLeaderboard.vue";
import MatchList from "./pages/MatchList.vue";
import TopShooters from "./pages/TopShooters.vue";
import TeamInfo from "./components/leaderboard/TeamInfo.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: TheHome,
    },
    {
      path: "/leaderboard",
      name: "Leaderboard",
      component: TheLeaderboard,
    },
    {
      path: "/matches",
      name: "Matches",
      component: MatchList,
    },
    {
      path: "/topshooters",
      name: "Topshooters",
      component: TopShooters,
    },
    {
      path: "/team/:teamId",
      name: "team details",
      component: TeamInfo,
    },
  ],
  linkActiveClass: "active",
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  next();
});

export default router;
