import { defineStore } from "pinia";
import {
  deleteRefreshToken,
  deleteToken,
  setRefreshToken,
  setToken,
} from "@/services/jwt";
import type { AuthStoreState } from "@/stores/typings";
import { $axios } from "@/plugins/axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthStoreState => ({
    currentUser: null,
  }),
  getters: {
    isUserLoggedIn: (state) => !!state.currentUser?.email,
    currentUserPermissions: (state) => {
      return [
        ...new Set(state.currentUser?.groups.map((group) => group.permissions)),
      ];
    },
  },
  actions: {
    async loginUser(email: string, password: string) {
      const userTokens = await $axios.post("/auth/login/", {
        email: email,
        password: password,
      });

      await setToken(userTokens.data.access);
      await setRefreshToken(userTokens.data.refresh);
      this.currentUser = (await $axios.get("/users/me/")).data;
    },
    async logoutUser() {
      await deleteToken();
      await deleteRefreshToken();
      this.currentUser = null;
    },
  },
});
