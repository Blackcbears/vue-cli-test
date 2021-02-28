import { defineComponent } from "vue";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import { useStore } from "vuex";
import "./style.scss";

const layout = defineComponent({
  setup() {
    const store = useStore();
    const handleClickOutside = () => {
      store.dispatch("app/closeSideBar", { withoutAnimation: false });
    };
    return () => (
      <>
        <div class="classObj" class="app-wrapper">
          <div class="drawer-bg" onClick={handleClickOutside} />
          <Sidebar class="sidebar-container" />
          <div class="{hasTagsView:needTagsView}" class="main-container">
            <div class="{'fixed-header':fixedHeader}">
              <Navbar />
              <TagsView v-if="needTagsView" />
            </div>
            <AppMain />
            <right-panel v-if="showSettings">
              <Settings />
            </right-panel>
          </div>
        </div>
      </>
    );
  }
});
export default layout;
