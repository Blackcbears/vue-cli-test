import {defineComponent, reactive} from "vue";
import {isExternal} from "@/utils/validate";
import AppLink from "./AppLink";
import MenuItem from "./Item";
import path from 'path'

interface Item {
    // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1 (默认 false)
    hidden: boolean,
    //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
    redirect?: string,
    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    alwaysShow?: boolean,
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
            default: ''
        },
        className: {
            type: String,
            default: 'nest-men'
        }
    },
    setup: function (props) {
        let onlyOneChild = reactive<Item>({
            meta: {activeMenu: "", affix: false, breadcrumb: true, noCache: false},
            name: "",
            path: "",
            hidden: false
        });
        const {item, isNest,basePath, className } =
            props as Readonly<{ item: Item, isNest: boolean, basePath: string, className: string }>;
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
                    onlyOneChild = {...parent, path: '', noShowingChildren: true};
                    return true;
                }
            }
            return false
        };
        const resolvePath = (routePath: string) => {
            if (isExternal(routePath)) {
                return routePath;
            }
            if (isExternal(basePath)) {
                return basePath;
            }
            return path.resolve(basePath, routePath);
        }
        /**
         *
         */
        const sidebarItemData = (children: Item[]): JSX.Element[] => {
            return children.map(child => {
                return <sidebarItem
                    key={child.path}
                    is-nest={true}
                    item={child}
                    base-path={resolvePath(child.path)}
                    class-name="nest-menu"
                />
            });

        }
        // 条件展示菜单
        const subMenu: JSX.Element = () => {
            if (hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow) {
                if (onlyOneChild.meta) {
                    return <AppLink to={resolvePath(onlyOneChild.path)} >
                        <el-menu-item
                            index={resolvePath(onlyOneChild.path)} class={isNest ? className :
                            ['submenu-title-noDropdown',]}
                        >
                            <MenuItem
                                icon={onlyOneChild.meta.icon || (item.meta && item.meta.icon)}
                                title={onlyOneChild.meta.title}/>
                        </el-menu-item>
                    </AppLink>
                }
            } else {
                return <el-submenu class={className} ref="subMenu" index={resolvePath(item.path)} popper-append-to-body={true} v-slots={{
                    title:()=> item.meta ? <MenuItem icon={item.meta && item.meta.icon} title={item.meta.title}/> : ''
                }}>
                    {sidebarItemData(item.children as Item[])}
                </el-submenu>
            }
        }


        if (!item.hidden) {
            return () => (
                <>
                    <subMenu/>
                </>
            )
        }

    }
});

export default sidebarItem;