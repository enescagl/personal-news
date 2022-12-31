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
      title: "Login",
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
          title: "Add Article",
        },
      },
      {
        path: "edit/:id?",
        name: "EditArticle",
        component: () => import("@/views/Articles/ArticleForm.vue"),
        meta: {
          authRequired: true,
          title: "Edit Article",
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
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];

export default routes;
