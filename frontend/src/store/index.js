import Vue from "vue";
import Vuex from "vuex";
import NewsModule from "@/store/news";
import LayoutModule from "@/store/layout";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    news: NewsModule,
    layout: LayoutModule,
  },
});
