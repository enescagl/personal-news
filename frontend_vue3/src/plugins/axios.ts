import axios from "axios";
import type { AxiosInstance } from "axios";
import { fillAxiosHeader, handleUnauthorizedRequest } from "@/services/jwt";
import type { App, Plugin } from "vue";
import type { AxiosOptions } from "@/typings";

let $axios: AxiosInstance;
const AxiosPlugin: Plugin = {
  install(app: App, _options: AxiosOptions) {
    let instance = axios.create({
      baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
    });
    instance = handleUnauthorizedRequest(instance);
    instance = fillAxiosHeader(instance);

    $axios = instance;
    app.config.globalProperties.$axios = instance;
  },
};

export default AxiosPlugin;
export { $axios };
