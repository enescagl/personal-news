import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axiosPlugin from "./plugins/axios";
import "tailwindcss/tailwind.css";

Vue.config.productionTip = false;

Vue.use(axiosPlugin);

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

store.$app = app;
app.$mount("#app");
