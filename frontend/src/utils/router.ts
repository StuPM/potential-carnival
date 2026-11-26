import { createWebHistory, createRouter } from "vue-router";

import Dashboard from "../components/Dashboard.vue";
import Admin from "../components/Admin/Admin.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/admin", component: Admin },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
