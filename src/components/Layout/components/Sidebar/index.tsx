import {computed, defineComponent} from "vue";
import {useRoute} from 'vue-router'
import SidebarItem from "./SidebarItem";


interface Item {
    // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1 (默认 false)
    hidden: boolean,
    //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
    redirect?: string,
    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    alwaysShow?: boolean
    path: string,
    name: string, // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
        // 设置该路由进入的权限，支持多个权限叠加
        roles?: string[],
        // 设置该路由在侧边栏和面包屑中展示的名字
        title?: string,
        // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
        icon?: string,
        // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        noCache: boolean,
        // 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
        breadcrumb: boolean,
        // 如果设置为true，它则会固定在tags-view中(默认 false)
        affix: boolean,

        // 当路由设置了该属性，则会高亮相对应的侧边栏。
        // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
        // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
        activeMenu: string,

    }
    noShowingChildren?: boolean,
    children?: Item[],

}

const sidebar = defineComponent({
    setup() {

        const route = useRoute();
        // 活动页
        const activeMenu = computed(() => {
            const {meta, path} = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        })
        const routes: Item = {
            alwaysShow: false,
            children: [{
                alwaysShow: false,
                children: [],
                hidden: false,
                meta: {activeMenu: "/about", affix: false, breadcrumb: false, noCache: false,title:"导航二",icon:"el-icon-platform-eleme"},
                name: "导航二",
                noShowingChildren: false,
                path: "/about",
                redirect: ""
            },{
                alwaysShow: false,
                hidden: false,
                meta: {activeMenu: "/about", affix: false, breadcrumb: false, noCache: false,title:"导航三",icon:"el-icon-platform-eleme"},
                name: "导航三",
                noShowingChildren: false,
                path: "/about",
                redirect: ""
                ,children: [{
            alwaysShow: false,
            children: [],
            hidden: false,
            meta: {activeMenu: "/about", affix: false, breadcrumb: false, noCache: false,title:"导航二",icon:"el-icon-s-goods"},
            name: "导航二",
            noShowingChildren: false,
            path: "/about",
            redirect: ""
        },{
            alwaysShow: false,
            children: [],
            hidden: false,
            meta: {activeMenu: "/Home", affix: false, breadcrumb: false, noCache: false,title:"导航三",icon:"el-icon-platform-eleme"},
            name: "导航三",
            noShowingChildren: false,
            path: "/about",
            redirect: ""
        }],
            }],
            hidden: false,
            meta: {activeMenu: "/about", affix: false, breadcrumb: false, noCache: false,title:"导航一",icon:"el-icon-s-goods"},
            name: "导航仪",
            noShowingChildren: false,
            path: "/about",
            redirect: ""

        }
        return () => (
            <>
                <div class={'has-logo'}>
                    {/*<logo v-if="showLogo" :collapse="isCollapse" />*/}
                    <el-scrollbar wrap-class="scrollbar-wrapper">
                        <el-menu
                           /* default-active={activeMenu}*/
                            /*collapse="isCollapse"
                            background-color="variables.menuBg"
                            text-color="variables.menuText"
                            unique-opened={false}
                            active-text-color="variables.menuActiveText"
                            collapse-transition={false}
                            mode="vertical"*/
                        >
                            <SidebarItem key={route.path} item={routes} base-path={route.path}/>
                        </el-menu>
                    </el-scrollbar>
                </div>
            </>
        )
    }
});

export default sidebar;