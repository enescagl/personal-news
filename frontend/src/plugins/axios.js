import axios from "axios";

let axiosPlugin = {};

// eslint-disable-next-line no-unused-vars
axiosPlugin.install = function (Vue, _options) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
  });

  Vue.prototype.$http = instance;
  Vue.prototype.$axios = axios;
};

export default axiosPlugin;
