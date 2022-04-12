import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { $axios } from "@/plugins/axios";

import { getRefreshToken, getToken, setToken } from "@/services/jwt";
import { SET_CURRENT_USER } from "@/store/mutation-types/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Articles" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/articles",
    name: "Articles",
    component: () => import("@/views/Articles.vue"),
    redirect: { name: "ArticleList" },
    children: [
      {
        path: "add",
        name: "AddArticle",
        component: () => import("@/views/Articles/ArticleForm.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "edit/:id?",
        name: "EditArticle",
        component: () => import("@/views/Articles/ArticleForm.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "",
        name: "ArticleList",
        component: () => import("@/views/Articles/ArticleList.vue"),
        meta: {
          authRequired: false,
          hasAuthView: true,
        },
      },
      {
        path: ":id",
        name: "ArticleDetail",
        component: () => import("@/views/Articles/ArticleDetail.vue"),
        meta: {
          authRequired: false,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

function refreshAccessToken(refreshToken) {
  $axios
    .post("auth/refresh/", { refresh: refreshToken })
    .then(({ data }) => setToken(data.access));
}

router.beforeEach((to, from, next) => {
  const token = getToken();
  const refreshToken = getRefreshToken();
  const routeRequiresAuth = to.matched.some(
    (route) => route.meta?.authRequired
  );

  const routeHasAuthView = to.matched.some((route) => route.meta?.hasAuthView);

  if (routeRequiresAuth) {
    if (!token) {
      next({ name: "Login" });
    }
    $axios
      .get("/users/me/")
      .then(({ data }) => {
        store.commit(`auth/${SET_CURRENT_USER}`, data);
      })
      .catch((error) => {
        console.error({ error });
        if (error.response.status === 401) {
          if (refreshToken) {
            refreshAccessToken(refreshToken);
            next();
          }
          next({ name: "Login" });
        }
      });
  }
  if (routeHasAuthView && token) {
    $axios
      .get("/users/me/")
      .then(({ data }) => {
        store.commit(`auth/${SET_CURRENT_USER}`, data);
      })
      .catch((error) => {
        console.error({ error });
        if (error.response.status === 401) {
          if (refreshToken) {
            refreshAccessToken(refreshToken);
            next();
          }
          next({ name: "Login" });
        }
      });
  }
  next();
});

export default router;
