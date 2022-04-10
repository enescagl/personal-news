import axios from "axios";
import { handleUnauthorizedRequest, fillAxiosHeader } from "@/services/jwt";

let axiosPlugin = {};
let $axios;
// eslint-disable-next-line no-unused-vars
axiosPlugin.install = function (Vue, _options) {
  let instance = axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
  });
  instance = handleUnauthorizedRequest(instance);
  instance = fillAxiosHeader(instance);
  $axios = instance;
  Vue.prototype.$axios = instance;
};

export default axiosPlugin;
export { $axios };
