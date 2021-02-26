import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
import Item from "./Item";

const sidebar = defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore()
    // 活动页
    const activeMenu = computed(() => {
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });

    const isCollapse = computed<boolean>(() => {
      return true;
    });

    const showLogo = computed<boolean> ({
      return store.state.settings.sidebarLogo
    });

    const routes: Item[] = [
      {
        alwaysShow: false,
        children: [
          {
            alwaysShow: false,
            children: [],
            hidden: false,
            meta: {
              activeMenu: "/about",
              affix: false,
              breadcrumb: false,
              noCache: false,
              title: "导航二",
              icon: "el-icon-platform-eleme"
            },
            name: "导航二",
            noShowingChildren: false,
            path: "/about",
            redirect: ""
          },
          {
            alwaysShow: false,
            hidden: false,
            meta: {
              activeMenu: "/about",
              affix: false,
              breadcrumb: false,
              noCache: false,
              title: "导航三",
              icon: "el-icon-platform-eleme"
            },
            name: "导航三",
            noShowingChildren: false,
            path: "/about",
            redirect: "",
            children: [
              {
                alwaysShow: false,
                children: [],
                hidden: false,
                meta: {
                  activeMenu: "/about",
                  affix: false,
                  breadcrumb: false,
                  noCache: false,
                  title: "导航二",
                  icon: "el-icon-s-goods"
                },
                name: "导航二",
                noShowingChildren: false,
                path: "/",
                redirect: ""
              },
              {
                alwaysShow: false,
                children: [],
                hidden: false,
                meta: {
                  activeMenu: "/Home",
                  affix: false,
                  breadcrumb: false,
                  noCache: false,
                  title: "导航三",
                  icon: "el-icon-platform-eleme"
                },
                name: "导航三",
                noShowingChildren: false,
                path: "/home/data",
                redirect: ""
              }
            ]
          }
        ],
        hidden: false,
        meta: {
          activeMenu: "/about",
          affix: false,
          breadcrumb: false,
          noCache: false,
          title: "导航一",
          icon: "el-icon-s-goods"
        },
        name: "导航仪",
        noShowingChildren: false,
        path: "/about",
        redirect: ""
      },
      {
        alwaysShow: false,
        children: [
          {
            alwaysShow: false,
            children: [],
            hidden: false,
            meta: {
              activeMenu: "/about",
              affix: false,
              breadcrumb: false,
              noCache: false,
              title: "导航二",
              icon: "el-icon-platform-eleme"
            },
            name: "导航二",
            noShowingChildren: false,
            path: "/about",
            redirect: ""
          },
          {
            alwaysShow: false,
            hidden: false,
            meta: {
              activeMenu: "/about",
              affix: false,
              breadcrumb: false,
              noCache: false,
              title: "导航三",
              icon: "el-icon-platform-eleme"
            },
            name: "导航三",
            noShowingChildren: false,
            path: "/about",
            redirect: "",
            children: [
              {
                alwaysShow: false,
                children: [],
                hidden: false,
                meta: {
                  activeMenu: "/about",
                  affix: false,
                  breadcrumb: false,
                  noCache: false,
                  title: "导航二",
                  icon: "el-icon-s-goods"
                },
                name: "导航二",
                noShowingChildren: false,
                path: "/",
                redirect: ""
              },
              {
                alwaysShow: false,
                children: [],
                hidden: false,
                meta: {
                  activeMenu: "/Home",
                  affix: false,
                  breadcrumb: false,
                  noCache: false,
                  title: "导航三",
                  icon: "el-icon-platform-eleme"
                },
                name: "导航三",
                noShowingChildren: false,
                path: "/about",
                redirect: ""
              }
            ]
          }
        ],
        hidden: false,
        meta: {
          activeMenu: "/about",
          affix: false,
          breadcrumb: false,
          noCache: false,
          title: "导航一",
          icon: "el-icon-s-goods"
        },
        name: "导航s",
        noShowingChildren: false,
        path: "/home",
        redirect: ""
      }
    ];

    const SidebarItemData = (routeItems: Item[]) => {
      return routeItems.map(route => {
        return (
          <SidebarItem key={route.path} item={route} base-path={route.path} />
        );
      });
    };



    return () => (
      <>
        <div class="has-logo">
          <Logo collapse={isCollapse.value} />
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
              default-active={activeMenu.value}
              /*collapse="isCollapse"
                                                                                        background-color="variables.menuBg"
                                                                                        text-color="variables.menuText"
                                                                                        unique-opened={false}
                                                                                        active-text-color="variables.menuActiveText"
                                                                                        collapse-transition={false}
                                                                                        mode="vertical"*/
            >
              {SidebarItemData(routes)}
            </el-menu>
          </el-scrollbar>
        </div>
      </>
    );
  }
});

export default sidebar;
