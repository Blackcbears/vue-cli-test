import { watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { AppTypes, DeviceType } from "@/store/modules/app/AppTypes";

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
        AppTypes.APP_TOGGLE_DEVICE,
        isMobileStr ? DeviceType.Mobile : DeviceType.Desktop
      );

      if (isMobileStr) {
        store.dispatch(AppTypes.APP_CLOSE_SIDEBAR, { withoutAnimation: true });
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
        store.dispatch(AppTypes.APP_CLOSE_SIDEBAR, { withoutAnimation: false });
      }
    }
  );

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch(AppTypes.APP_TOGGLE_DEVICE, DeviceType.Mobile);
      store.dispatch(AppTypes.APP_CLOSE_SIDEBAR, { withoutAnimation: true });
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
