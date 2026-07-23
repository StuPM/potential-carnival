import { createMemoryHistory, createRouter } from "vue-router";

import Dashboard from "../components/Dashboard.vue";

const routes = [{ path: "/", component: Dashboard }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
