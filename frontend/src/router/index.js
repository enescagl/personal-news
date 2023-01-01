import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { $axios } from "@/plugins/axios";

import { getRefreshToken, getToken, setToken } from "@/services/jwt";
import { SET_CURRENT_USER } from "@/store/mutation-types/auth";

import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

async function refreshAccessToken(refreshToken) {
  const { data: access } = await $axios.post("auth/refresh/", {
    refresh: refreshToken,
  });
  setToken(access);
}

async function getUserInfoOrRefreshThenRedirect(refreshToken, next) {
  try {
    const { data } = await $axios.get("/users/me/");
    store.commit(`auth/${SET_CURRENT_USER}`, data);
  } catch (error) {
    console.error({ error });
    if (error.response.status === 401 && refreshToken) {
      await refreshAccessToken(refreshToken);
      next();
    } else {
      next({ name: "Login" });
    }
  }
}

function setPageTitle(to) {
  const title = "Personal News";
  document.title = to.meta?.title ? `${to.meta?.title} - ${title}` : title;
}

router.beforeEach(async (to, from, next) => {
  const token = getToken();
  const refreshToken = getRefreshToken();
  const routeRequiresAuth = to.matched.some(
    (route) => route.meta?.authRequired
  );

  const routeHasAuthView = to.matched.some((route) => route.meta?.hasAuthView);

  if ((routeHasAuthView || routeRequiresAuth) && token) {
    await getUserInfoOrRefreshThenRedirect(refreshToken);
  }
  if (routeRequiresAuth && !token) {
    next({ name: "Login" });
  }
  next();
});

router.afterEach((to) => {
  setPageTitle(to);
});

export default router;
