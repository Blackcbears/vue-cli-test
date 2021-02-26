/**
 * @author: CuiJing
 * @description: logo
 * @date: 2021/02/26 11:22

 */
import { defineComponent, ref } from "vue";
import "./style.module.scss";

const SidebarLogo = defineComponent({
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup: function(props) {
    const title = ref("");
    const logo = ref(
      "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
    );

    // 条件渲染标题或者图片
    const imgOrTitle = (logo: string, title: string) => {
      if (logo) {
        return <img alt="image" src={logo} class="sidebar-logo" />;
      } else {
        return <h1 class="sidebar-title">{title} </h1>;
      }
    };

    return () => (
      <div class={["sidebar-logo-container", props.collapse ? "collapse" : ""]}>
        <transition name="sidebarLogoFade">
          <router-link
            key={props.collapse ? "collapse" : "expand"}
            className="sidebar-logo-link"
            to="/"
          >
            {imgOrTitle(logo.value, title.value)}
          </router-link>
        </transition>
      </div>
    );
  }
});
export default SidebarLogo;
