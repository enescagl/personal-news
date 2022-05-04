import { createRouter, createWebHistory } from "vue-router";
import type { Auth, User } from "@/models/auth";
import type { NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { $axios } from "@/plugins/axios";
import { getRefreshToken, getToken, setToken } from "@/services/jwt";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

function refreshAccessToken(refreshToken: string) {
  $axios
    .post("auth/refresh/", { refresh: refreshToken })
    .then(({ data }: { data: Auth }) => setToken(data.access));
}

function getMe(afterCallback: NavigationGuardNext) {
  const refreshToken = getRefreshToken();
  const authStore = useAuthStore();

  $axios
    .get("/users/me/")
    .then(({ data }: { data: User }) => {
      authStore.currentUser = data;
    })
    .catch((error) => {
      console.error({ error });
      if (error.response.status === 401) {
        if (refreshToken) {
          refreshAccessToken(refreshToken);
          afterCallback();
        }
        afterCallback({ name: "Login" });
      }
    });
}

router.beforeEach((to, from, next) => {
  const token = getToken();
  const routeRequiresAuth = to.matched.some(
    (route) => route.meta?.authRequired
  );

  const routeHasAuthView = to.matched.some((route) => route.meta?.hasAuthView);

  if (routeRequiresAuth) {
    if (!token) {
      next({ name: "Login" });
    }
    getMe(next);
  }
  if (routeHasAuthView && token) {
    getMe(next);
  }
  next();
});

export default router;
