const articlesModule = {
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
    // eslint-disable-next-line no-unused-vars
    async create({ _commit, dispatch }, obj) {
      await this.$app.$axios.post(`/news/`, obj, {
        headers: { "content-type": "multipart/form-data" },
      });
      await dispatch("getPage", 1);
    },
    // eslint-disable-next-line no-unused-vars
    async change({ _commit, dispatch }, { id, obj }) {
      await this.$app.$axios.patch(`/news/${id}/`, obj, {
        headers: { "content-type": "multipart/form-data" },
      });
      await dispatch("getPage", 1);
    },
    // eslint-disable-next-line no-unused-vars
  },
};

export default articlesModule;
