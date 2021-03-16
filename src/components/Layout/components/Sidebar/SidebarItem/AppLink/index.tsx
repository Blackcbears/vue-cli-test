import { defineComponent } from "vue";
import { isExternal } from "@/utils/validate";

const AppLink = defineComponent({
    props: {
        to: {
            type: String,
            required: true
        }
    },
    setup(props, { slots }) {
        const type = (to: string) => {
            if (isExternal(to)) {
                return (
                    <a href={to} target="_blank" rel="noopener">
                        {slots}
                    </a>
                );
            } else {
                return <router-link to={to}>{slots}</router-link>;
            }
        };
        return () => <>{type(props.to)}</>;
    }
});
export default AppLink;
