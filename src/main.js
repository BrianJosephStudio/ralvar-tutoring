import { createApp, ref } from "vue";
import "./style.scss";
import router from "./router";
import App from "./App.vue";
import store from "./vuex";

export const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
