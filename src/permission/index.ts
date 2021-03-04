/**
 * @author CuiJIng
 * @description 权限配置
 * @date 2021-02-02 9:57
 */
import NProgress from "nprogress"; // progress bar
import router from "@/router";
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from "vue-router";
import { useStore } from "@/store";
import { ElMessage } from "element-plus";
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const store = useStore();
    // start progress bar
    NProgress.start();
    // determine whether the user has logged in
    const hasToken = getToken();
    if (hasToken) {
      if (to.path === "/login") {
        // if is logged in, redirect to the home page
        next({ path: "/" });
        NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        if (store.state.user.roles.length === 0) {
          try {
            // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
            await store.dispatch("user/getInfo", hasToken);
            const roles = store.state.user.roles;
            // Generate accessible routes map based on role
            await store.dispatch("permission/generateRoutes", roles);
            // dynamically add accessible routes
            store.state.permission.dynamicRoutes.forEach(
              (route: RouteRecordRaw) => {
                router.addRoute(route);
              }
            );
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true });
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch("user/resetToken");
            ElMessage.error(error || "Has Error");
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        } else {
          next();
        }
      }
    } else {
      /* has no token*/

      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }
);

router.afterEach((to: RouteLocationNormalized) => {
  // finish progress bar
  NProgress.done();
  // set page title
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  document.title = getPageTitle(to.meta?.title);
});
