import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import model from "./model";

createApp(App).use(model).use(router).mount("#app");
