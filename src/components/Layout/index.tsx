import {defineComponent} from "vue";
import "./style.scss"

const layout = defineComponent({
    setup() {
        const handleOpen = (key: any, keyPath: any) => {
            console.log(key, keyPath);
        };
        const handleClose = (key: any, keyPath: any) => {
            console.log(key, keyPath);
        };
        return () => (
            <>
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    open={handleOpen}
                    close={handleClose}>
                    <el-submenu index="1" v-slots={{
                        title: () =>
                            <>
                                <i class="el-icon-location"/>
                                <span>导航一</span>
                            </>,
                    }}>
                        <el-menu-item-group v-slots={{
                            title: () => <>分组一</>,
                        }}>

                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4" v-slots={{
                            title: () => <>选项4</>,
                        }}>

                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        {{
                            title: () => <><i class="el-icon-menu"/>导航二</>,
                        }}
                    </el-menu-item>
                    <el-menu-item index="3" disabled v-slots={{
                        title: () => <>导航三</>,
                    }}>
                        <i class="el-icon-document"/>

                    </el-menu-item>
                    <el-menu-item index="4" v-slots={{
                        title: () => <>导航四</>,
                    }}>
                        <i class="el-icon-setting"/>

                    </el-menu-item>
                </el-menu>
            </>
        );
    }
});
export default layout;