import {
  deleteRefreshToken,
  deleteToken,
  setRefreshToken,
  setToken,
} from "@/services/jwt";
import { SET_CURRENT_USER } from "./mutation-types/auth";

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
      const { data: userTokens } = await this.$app.$axios.post("/auth/login/", {
        email: email,
        password: password,
      });

      await setToken(userTokens.access);
      await setRefreshToken(userTokens.refresh);
      const { data: currentUser } = await this.$app.$axios.get("/users/me/");

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
      return [
        ...new Set(
          state.currentUser?.groups.map((group) => group.permissions).flat(),
        ),
      ];
    },
  },
};

export default authModule;
