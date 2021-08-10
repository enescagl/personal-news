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
      const news = await this._vm.$http.get(`/news/?page=${page}`);
      commit("setCurrentPageList", news.data);
    },
    async getPageWithFilter({ commit }, { page, filter }) {
      const news = await this._vm.$http.get(
        `/news/?page=${page}&heading=${filter}`
      );
      commit("setCurrentPageList", news.data);
    },
    async getDetail({ commit }, id) {
      const news = await this._vm.$http.get(`/news/${id}`);
      commit("setCurrentDetail", news.data);
    },
    // eslint-disable-next-line no-unused-vars
    create({ _commit }, obj) {
      return this._vm.$http.post(`/news/`, obj, {
        headers: { "content-type": "multipart/form-data" },
      });
    },
    // eslint-disable-next-line no-unused-vars
    change({ _commit }, { id, obj }) {
      return this._vm.$http.post(`/news/${id}`, obj, {
        headers: { "content-type": "multipart/form-data" },
      });
    },
    // eslint-disable-next-line no-unused-vars
    remove({ _commit }, id) {
      console.log(id);
      this._vm.$http.delete(`/news/${id}`);
    },
  },
};

export default newsModule;
