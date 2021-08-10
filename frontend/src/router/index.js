import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "News" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/views/News.vue"),
    redirect: { name: "NewsIndex" },
    children: [
      {
        path: "add",
        name: "AddNews",
        component: () => import("@/views/News/AddNews.vue"),
      },
      {
        path: "edit/:id",
        name: "EditNews",
        component: () => import("@/views/News/EditNews.vue"),
      },
      {
        path: "",
        name: "NewsIndex",
        component: () => import("@/views/News/Index.vue"),
      },
      {
        path: ":id",
        name: "SingleNews",
        component: () => import("@/views/News/SingleNews.vue"),
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
