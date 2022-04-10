import Vue from "vue";
import Vuex from "vuex";
import NewsModule from "@/store/articles";
import AuthModule from "@/store/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    news: NewsModule,
    auth: AuthModule,
  },
});
