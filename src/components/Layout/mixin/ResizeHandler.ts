import { DeviceType } from "@/store/modules/app";
import { watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default function() {
  const store = useStore();
  const route = useRoute();
  const device = computed<DeviceType>(() => {
    return store.state.app.device;
  });

  const sidebar = computed(() => {
    return store.state.app.sidebar;
  });
  const isMobile = () => {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };
  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential

  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobileStr = isMobile();
      store.dispatch(
        "app/toggleDevice",
        isMobileStr ? DeviceType.Mobile : DeviceType.Desktop
      );

      if (isMobileStr) {
        store.dispatch("app/closeSideBar", { withoutAnimation: true });
      }
    }
  };

  const removeEventListenerResize = () => {
    window.removeEventListener("resize", resizeHandler);
  };

  const addEventListenerOnResize = () => {
    window.addEventListener("resize", resizeHandler);
  };

  const watchRouter = watch(
    () => route.name,
    () => {
      if (device.value === DeviceType.Mobile && sidebar.value.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    }
  );

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch("app/toggleDevice", DeviceType.Mobile);
      store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  };

  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter
  };
}
