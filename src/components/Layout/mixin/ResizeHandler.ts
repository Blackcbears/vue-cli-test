import store from "@/store";
import { DeviceType } from "@/store/modules/app";
import {
  defineComponent,
  WatchEffect,
  onMounted,
  onBeforeMount,
  onBeforeUnmount
} from "vue";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default defineComponent({
  watch: {
    $route(route) {
      if (this.device === DeviceType.Mobile && this.sidebar.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    }
  },
  onbeforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  onBeforeUnmount = () => {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.dispatch("app/toggleDevice", DeviceType.Mobile);
      store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.dispatch(
          "app/toggleDevice",
          isMobile ? DeviceType.Mobile : DeviceType.Desktop
        );

        if (isMobile) {
          store.dispatch("app/closeSideBar", { withoutAnimation: true });
        }
      }
    }
  }
});
