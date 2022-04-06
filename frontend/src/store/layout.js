import JwtService from "@/services/jwt";

const layoutModule = {
  namespaced: true,
  state: () => {
    return {
      isUserLoggedIn: false,
      loggedInUser: {},
    };
  },
  mutations: {
    setIsUserLoggedIn(state, payload) {
      state.isUserLoggedIn = payload;
    },
    setLoggedInUser(state, payload) {
      state.loggedInUser = payload;
    },
  },
  actions: {
    async loginUser({ commit }, { username, password }) {
      this.jwtService = new JwtService(this.$app.$http);

      const userTokens = await this.jwtService.login({
        username: username,
        password: password,
      });

      await this.jwtService.setToken(userTokens.data.access);
      const currentUser = await this.$app.$http.get("/authentication/me/");

      commit("setLoggedInUser", currentUser);
      commit("setIsUserLoggedIn", currentUser ? true : false);
      // this.jwtService.setUserDataToLocal(JSON.stringify(currentUser.data));
    },
    async logoutUser({ commit }, page) {
      const news = await this.$app.$http.get(`/news/?page=${page}`);
      commit("setCurrentPageList", news.data);
    },
  },
};

export default layoutModule;
