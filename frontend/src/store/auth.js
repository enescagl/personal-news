import {
  deleteRefreshToken,
  deleteToken,
  setRefreshToken,
  setToken,
} from "@/services/jwt";
import { SET_CURRENT_USER } from "./mutation-types";

const authModule = {
  namespaced: true,
  state: () => {
    return {
      currentUser: {},
    };
  },
  mutations: {
    [SET_CURRENT_USER](state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      const userTokens = await this.$app.$axios.post("/auth/login/", {
        email: email,
        password: password,
      });

      await setToken(userTokens.data.access);
      await setRefreshToken(userTokens.data.refresh);
      const currentUser = (await this.$app.$axios.get("/users/me/")).data;

      commit(SET_CURRENT_USER, currentUser);
    },
    async logoutUser({ commit }) {
      await deleteToken();
      await deleteRefreshToken();
      commit(SET_CURRENT_USER, {});
    },
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.currentUser.email;
    },
    currentUserPermissions(state) {
      return state.currentUser?.flat;
    },
  },
};

export default authModule;
