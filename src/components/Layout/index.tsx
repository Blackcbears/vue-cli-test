import {defineComponent} from "vue";
import {Sidebar} from "@/components/Layout/components";
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
                <Sidebar/>
            </>
        );
    }
});
export default layout;