import { defineComponent } from "vue";
import errorPage from "./components/index";

const Page401 = defineComponent({
    components: {
        errorPage
    },
    setup() {
        return () => (
            <error-page
                oops="抱歉!"
                headline="当前页面不存在..."
                info="请检查您输入的网址是否正确，或点击下面的按钮返回首页。"
                btn="返回首页"
                error-images={require("@/assets/error_images/401.png")}
            />
        );
    }
});
export default Page401;
