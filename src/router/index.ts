import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/Layout";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  /*  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () =>
          import(
            /!* webpackChunkName: "redirect" *!/ "@/views/redirect/Index.vue"
          )
      }
    ]
  },*/
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/401",
    component: () =>
      import(/* webpackChunkName: "error-page-401" */ "@/views/errorPage/401"),
    name: "Page401",
    meta: {
      title: "page401",
      noCache: true
    }
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "error-page-404" */ "@/views/errorPage/404"),
    name: "Page404",
    meta: {
      title: "page404",
      noCache: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/Home.vue"),
        name: "Dashboard",
        meta: { title: "首页", icon: "el-icon-s-help", affix: true }
      }
    ]
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    meta: { hidden: true },
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "profile" */ "@/views/profile/Index.vue"),
        name: "Profile",
        meta: {
          title: "profile",
          icon: "user",
          noCache: true
        }
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
      icon: "el-icon-s-help",
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
  { path: "/:pathMatch(.*)", redirect: "/404", meta: { hidden: true } }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
});

export default router;
