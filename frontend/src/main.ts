import { createApp } from "vue";
import "./style.css";

import App from "./App.vue";
import { router } from "./utils/router.ts";
import { createPinia } from "pinia";
import ui from "@nuxt/ui/vue-plugin";

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(ui).mount("#app");
