const newsModule = {
  namespaced: true,
  state: () => {
    return {
      currentPage: [],
      currentDetail: [],
    };
  },
  mutations: {
    setCurrentPageList(state, payload) {
      state.currentPage = payload;
    },
    setCurrentDetail(state, payload) {
      state.currentDetail = payload;
    },
  },
  actions: {
    async getPage({ commit }, page) {
      const news = await this._vm.$http.get(`/news/?${page}`);
      commit("setCurrentPageList", news);
    },
    async getSingle({ commit }, id) {
      const news = await this._vm.$http.get(`/news/${id}`);
      commit("setCurrentDetail", news);
    },
  },
};

export default newsModule;
