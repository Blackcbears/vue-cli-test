import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
import Item from "./Item";
import variables from "../../../../style/variables.module.scss";

const sidebar = defineComponent({
    setup() {
        const route = useRoute();
        const store = useStore();
        // 活动页
        const activeMenu = computed(() => {
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        });

        const routes = computed<Item[]>(() => {
            return store.state.permission.routes;
        });

        const isCollapse = computed<boolean>(() => {
            return !store.state.app.sidebar.opened;
        });
        const showLogo = computed<boolean>(() => {
            return store.state.settings.sidebarLogo;
        });

        const SidebarItemData = (routeItems: Item[]) => {
            return routeItems.map(route => {
                return (
                    <SidebarItem
                        key={route.path}
                        item={route}
                        base-path={route.path}
                    />
                );
            });
        };

        return () => (
            <>
                <div
                    class={["sidebar-container", showLogo.value && "has-logo"]}>
                    <Logo collapse={isCollapse.value} />
                    <el-scrollbar wrap-class="scrollbar-wrapper">
                        <el-menu
                            default-active={activeMenu.value}
                            collapse={isCollapse.value}
                            background-color={variables.menuBg}
                            text-color={variables.menuText}
                            unique-opened={false}
                            active-text-color={variables.menuActiveText}
                            collapse-transition={false}
                            mode="vertical">
                            {SidebarItemData(routes.value)}
                        </el-menu>
                    </el-scrollbar>
                </div>
            </>
        );
    }
});

export default sidebar;
