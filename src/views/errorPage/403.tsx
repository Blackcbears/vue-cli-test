import { defineComponent } from "vue";
import errorPage from "./components/index";

const Page403 = defineComponent({
  components: {
    errorPage
  },
  setup() {
    return () => (
      <error-page
        oops="抱歉!"
        headline="当前页面不存在..."
        info="数据错误。"
        btn="返回首页"
        error-images={require("@/assets/error_images/401.png")}
      />
    );
  }
});
export default Page403;
