import { createRouter, createWebHistory } from "vue-router";

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

export default router;
