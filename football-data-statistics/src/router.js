import { createRouter, createWebHistory } from "vue-router";
import TheHome from "./pages/TheHome.vue";
import TheLeaderboard from "./pages/TheLeaderboard.vue";
import MatchList from "./pages/MatchList.vue";
import TopShooters from "./pages/TopShooters.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: TheHome,
    },
    {
      path: "/leaderboard",
      component: TheLeaderboard,
    },
    {
      path: "/matches",
      component: MatchList,
    },
    {
      path: "/topshooters",
      component: TopShooters,
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
