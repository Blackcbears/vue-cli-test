import {defineComponent, reactive} from "vue";
import {isExternal} from "@/untils/validate";
import path from 'path'

const SidebarItem = defineComponent({
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
        }
    },
    setup(props) {
        let onlyOneChild: object = reactive(undefined);

        const hasOneShowingChild = (children = [], parent) => {
            const showingChildren = children.filter(item => {
                if (props.item.hidden) {
                    return false
                } else {
                    // Temp set(will be used if only has one showing child)
                    onlyOneChild = item
                    return true
                }
            })
            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true
            }
            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                onlyOneChild = {...parent, path: '', noShowingChildren: true}
                return true
            }
            return false
        };
        const resolvePath = (routePath) => {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(props.basePath)) {
                return props.basePath
            }
            return path.resolve(props.basePath, routePath)
        }
        // 条件展示菜单
        const subMenu = () => {
            if (hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow) {
                return <app-link v-if="onlyOneChild.meta"
                                 to={resolvePath(onlyOneChild.path)}>
                    <el-menu-item
                        index={resolvePath(onlyOneChild.path)} className="{'submenu-title-noDropdown':!isNest}">
                        <item
                            icon={onlyOneChild.meta.icon || (item.meta && item.meta.icon)}
                            title={onlyOneChild.meta.title}/>
                    </el-menu-item>
                </app-link>
            } else {
                return <el-submenu ref="subMenu" index={resolvePath(item.path)} popper-append-to-body v-slots={{
                    title:
                        <item v-if="item.meta" icon={item.meta && item.meta.icon} title={item.meta.title}/>
                }}>
                    <sidebar-item
                        v-for="child in item.children"
                        key={child.path}
                        is-nest={true}
                        item={child}
                        base-path={resolvePath(child.path)}
                        className="nest-menu"
                    />
                </el-submenu>
            }
        }
        return () => (
            <>
                <div v-if={!item.hidden}>
                    {subMenu}
                </div>
            </>
        )
    }
});

export default SidebarItem;