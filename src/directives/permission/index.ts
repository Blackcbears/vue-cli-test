/**
 * @name: index
 * @author: CuiJing
 * @date: 2021/3/7 0:55
 * @description：directive 处理类
 * @update: 2021/3/7 0:55
 */
import { useStore } from "vuex";
import { Directive, DirectiveBinding } from "vue";

function checkPermission(el: any, binding: DirectiveBinding<any>) {
  const { value } = binding;
  const roles = useStore().getters && useStore().getters.roles;

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some((role: any) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`);
  }
}
export const permission: Directive = {
  mounted(el, binding) {
    checkPermission(el, binding);
  }
};
