import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/Layout";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true
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
export const asyncRoutes = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "Permission",
    meta: {
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
  { path: "*", redirect: "/404", hidden: true }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
});

export default router;
