import {defineComponent} from "vue";
import * as style from "./Item.scss";

const menuItem = defineComponent({
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    render() {
        const {icon, title} = context.props
        const vnodes = []
        if (icon) {
            //if (icon.includes('el-icon')) {
            vnodes.push(<i class={[icon, style.subElIcon]}/>)
            /* } else {
                 vnodes.push(<svg-icon icon-class={icon}/>)
             }*/
        }
        if (title) {
            vnodes.push(<span slot='title'>{(title)}</span>)
        }
        return vnodes
    }
});

export default menuItem;