/**
 * @author: CuiJing
 * @description: logo
 * @date: 2021/02/26 11:22

 */
import { defineComponent, ref } from "vue";
import style from "./style.module.scss";

const SidebarLogo = defineComponent({
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup: function(props) {
    const title = ref("Vue Element Admin");
    const logo = ref(
      "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
    );

    // 条件渲染标题或者图片
    const imgOrTitle = (logo: string, title: string, collapse: boolean) => {
      const HTMLIndex: JSX.Element[] = [];
      if (logo) {
        HTMLIndex.push(
          <img alt="image" src={logo} class={style.sidebarLogo} />
        );
      }

      if (logo && !collapse) {
        HTMLIndex.push(<h1 class={style.sidebarTitle}>{title} </h1>);
      }
      return HTMLIndex;
    };

    return () => (
      <div
        class={[style.sidebarLogoContainer, props.collapse && style.collapse]}
      >
        <router-link
          key={props.collapse ? style.collapse : style.expand}
          class={style.sidebarLogoLink}
          to="/"
        >
          {imgOrTitle(logo.value, title.value, props.collapse)}
        </router-link>
      </div>
    );
  }
});
export default SidebarLogo;
