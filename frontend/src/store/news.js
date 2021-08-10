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
      const news = await this.$app.$http.get(`/news/?page=${page}`);
      commit("setCurrentPageList", news.data);
    },
    async getPageWithFilter({ commit }, { page, filter }) {
      const news = await this.$app.$http.get(
        `/news/?page=${page}&heading=${filter}`
      );
      commit("setCurrentPageList", news.data);
    },
    async getDetail({ commit }, id) {
      const news = await this.$app.$http.get(`/news/${id}/`);
      commit("setCurrentDetail", news.data);
    },
    // eslint-disable-next-line no-unused-vars
    async create({ _commit, dispatch }, obj) {
      await this.$app.$http.post(`/news/`, obj, {
        headers: { "content-type": "multipart/form-data" },
      });
      await dispatch("getPage", 1);
    },
    // eslint-disable-next-line no-unused-vars
    async change({ _commit, dispatch }, { id, obj }) {
      await this.$app.$http.patch(`/news/${id}/`, obj, {
        headers: { "content-type": "multipart/form-data" },
      });
      await dispatch("getPage", 1);
    },
    // eslint-disable-next-line no-unused-vars
    async remove({ _commit, dispatch }, id) {
      await this.$app.$http.delete(`/news/${id}/`);
      await dispatch("getPage", 1);
    },
  },
};

export default newsModule;
