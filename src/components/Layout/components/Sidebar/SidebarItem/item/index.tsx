import { defineComponent } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import "./style.scss";

const menuItem = defineComponent({
    props: {
        icon: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        const vnodes: JSX.Element[] = [];
        if (props.icon) {
            if (props.icon.includes("el-icon")) {
                vnodes.push(<i class={[props.icon, "sub-el-icon"]} />);
            } else {
                vnodes.push(<SvgIcon icon-class={props.icon} />);
            }
        }
        if (props.title) {
            vnodes.push(<span>{props.title}</span>);
        }
        return () => <>{vnodes}</>;
    }
});
export default menuItem;
