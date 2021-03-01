import { defineComponent, computed } from "vue";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import RightPanel from "@/components/RightPanel/index.vue";
import { useStore } from "vuex";
import "./style.scss";
import { DeviceType } from "@/store/modules/app";

const layout = defineComponent({
  setup() {
    const store = useStore();
    const handleClickOutside = () => {
      store.dispatch("app/closeSideBar", { withoutAnimation: false });
    };

    const device = computed<DeviceType>(() => {
      return store.state.app.device;
    });
    const sidebar = computed(() => {
      return store.state.app.sidebar;
    });

    const showSettings = computed<boolean>(() => {
      return store.state.settings.showSettings;
    });
    const showTagsView = computed<boolean>(() => {
      return store.state.settings.tagsView;
    });
    const fixedHeader = computed<boolean>(() => {
      return store.state.settings.fixedHeader;
    });

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === DeviceType.Mobile
      };
    });

    return () => (
      <>
        <div class={[classObj.value, "app-wrapper"]}>
          {device.value === DeviceType.Mobile && sidebar.value.opened && (
            <div class="drawer-bg" onClick={handleClickOutside} />
          )}
          <Sidebar class="sidebar-container" />
          <div class={[showTagsView.value, "main-container"]}>
            <div class={fixedHeader.value && "fixed-header"}>
              <Navbar />
              {showTagsView.value && <TagsView />}
            </div>
            <AppMain />
            {showSettings.value && (
              <RightPanel>
                <Settings />
              </RightPanel>
            )}
          </div>
        </div>
      </>
    );
  }
});
export default layout;
