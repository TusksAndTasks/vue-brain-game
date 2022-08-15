import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import GamePage from "@/views/GamePage.vue";

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

export default router;
