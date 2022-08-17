import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import GamePage from "@/views/GamePage.vue";

import model from "@/model";
import declareAvailableOperators from "@/utils/declareAvailableOperators";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/game",
    name: "game",
    component: GamePage,
  },
  {
    path: "/",
    name: "main",
    component: () => import("../views/MainPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (
    to.name === "game" &&
    declareAvailableOperators(model.state.settings.flags).length < 2 &&
    model.state.settings.difficulty > 3
  ) {
    return { name: "main" };
  }
});

export default router;
