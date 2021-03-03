import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/Layout";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true }
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
    meta: { hidden: true }
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Home.vue"),
        name: "Dashboard",
        meta: { title: "首页", icon: "dashboard", affix: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",

    name: "Permission",
    meta: {
      alwaysShow: true, // will always show the root menu
      title: "Permission",
      icon: "lock",
      roles: ["admin", "editor"] // you can set roles in root nav
    }
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    name: "Example",
    meta: {
      title: "Example",
      icon: "el-icon-s-help"
    }
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", meta: { hidden: true } }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
});

export default router;
