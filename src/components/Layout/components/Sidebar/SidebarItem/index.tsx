import { defineComponent, reactive } from "vue";
import { isExternal } from "@/utils/validate";
import AppLink from "./AppLink";
import MenuItem from "./item";
import Item from "../Item";
import path from "path";

const sidebarItem = defineComponent({
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: "nest-men"
    }
  },
  setup: function(props) {
    // 初始化当前渲染数据
    let onlyOneChild = reactive<Item>({
      meta: { activeMenu: "", affix: false, breadcrumb: true, noCache: false },
      name: "",
      path: "",
      hidden: false
    });
    // 解构 props 并为 Object 设定类型
    const { item, isNest, basePath, className } = props as Readonly<{
      item: Item;
      isNest: boolean;
      basePath: string;
      className: string;
    }>;
    // 判定是否需要展示页面
    const hasOneShowingChild = (children: Item[] | undefined, parent: Item) => {
      if (children) {
        const showingChildren = children.filter(item => {
          if (props.item.hidden) {
            return false;
          } else {
            // Temp set(will be used if only has one showing child)
            onlyOneChild = item;
            return true;
          }
        });
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true;
        }
        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          onlyOneChild = { ...parent, path: "", noShowingChildren: true };
          return true;
        }
      }
      return false;
    };
    // 重写地址
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }
      return path.resolve(basePath, routePath);
    };
    /**
     * 循环渲染组件 子引用方面处理数据
     */
    const sidebarItemData = (children: Item[]): JSX.Element[] => {
      return children.map(child => {
        return (
          <sidebarItem
            key={child.path}
            is-nest={true}
            item={child}
            base-path={resolvePath(child.path)}
            class-name="nest-menu"
          />
        );
      });
    };
    /**
     * 条件展示菜单 有子项与无子项分别渲染不同组件
     */
    const subMenu: JSX.Element = () => {
      if (
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      ) {
        if (onlyOneChild.meta) {
          return (
            <AppLink to={resolvePath(onlyOneChild.path)}>
              <el-menu-item
                index={resolvePath(onlyOneChild.path)}
                class={isNest ? className : ["submenu-title-noDropdown"]}
              >
                <MenuItem
                  icon={onlyOneChild.meta.icon || (item.meta && item.meta.icon)}
                  title={onlyOneChild.meta.title}
                />
              </el-menu-item>
            </AppLink>
          );
        }
      } else {
        return (
          <el-submenu
            class={className}
            ref="subMenu"
            index={resolvePath(item.path)}
            popper-append-to-body={true}
            v-slots={{
              title: () =>
                item.meta ? (
                  <MenuItem
                    icon={item.meta && item.meta.icon}
                    title={item.meta.title}
                  />
                ) : (
                  ""
                )
            }}
          >
            {sidebarItemData(item.children as Item[])}
          </el-submenu>
        );
      }
    };

    // 如果序言展示页面，则开始渲染
    if (!item.hidden) {
      return () => (
        <>
          <subMenu />
        </>
      );
    }
  }
});

export default sidebarItem;
