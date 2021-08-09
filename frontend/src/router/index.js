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
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings.vue"),
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
        path: "",
        name: "NewsIndex",
        component: () => import("@/views/News/Index.vue"),
      },
    ],
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
