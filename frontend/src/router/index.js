import Vue from "vue";
import VueRouter from "vue-router";

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
  },
  {
    path: "/articles",
    name: "Articles",
    component: () => import("@/views/Articles.vue"),
    redirect: { name: "ArticlesIndex" },
    children: [
      {
        path: "add",
        name: "AddArticle",
        component: () => import("@/views/Articles/ArticleForm.vue"),
      },
      {
        path: "edit/:id?",
        name: "EditArticle",
        component: () => import("@/views/Articles/ArticleForm.vue"),
      },
      {
        path: "",
        name: "ArticlesIndex",
        component: () => import("@/views/Articles/Index.vue"),
      },
      {
        path: ":id",
        name: "ArticleDetail",
        component: () => import("@/views/Articles/ArticleDetail.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   if (to.name === "AddNews" && userData) next({ name: "AddNews" });
//   else next({ name: "NewsIndex" });
// });

export default router;
