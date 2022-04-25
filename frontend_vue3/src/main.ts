import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";

import App from "./App.vue";
import router from "./router";
import AxiosPlugin from "@/plugins/axios";
// import { axiosPiniaPlugin } from "@/stores/plugins";

const app = createApp(App);
const pinia = createPinia();
// pinia.use(axiosPiniaPlugin);
app.use(AxiosPlugin);
app.use(pinia);
app.use(router);

app.mount("#app");
