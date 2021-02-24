import {computed, defineComponent} from "vue";
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import SidebarItem from "./SidebarItem";

const sidebar = defineComponent({
    setup() {
        // 获取初始化组件
        const store = useStore();
        const route = useRoute();
        // 活动页
        const activeMenu = computed(() => {
            const {meta, path} = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        })

        return () => (
            <>
                <div class={'has-logo'}>
                    {/*<logo v-if="showLogo" :collapse="isCollapse" />*/}
                    <el-scrollbar wrap-class="scrollbar-wrapper">
                        <el-menu
                            default-active={activeMenu}
                            collapse="isCollapse"
                            background-color="variables.menuBg"
                            text-color="variables.menuText"
                            unique-opened={false}
                            active-text-color="variables.menuActiveText"
                            collapse-transition={false}
                            mode="vertical"
                        >
                            <SidebarItem key="route.path" item="route" base-path="route.path"/>
                        </el-menu>
                    </el-scrollbar>
                </div>
            </>
        )
    }
});

export default sidebar;