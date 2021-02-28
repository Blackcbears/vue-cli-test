import styles from "../../style/element-variables.module.scss";
import defaultSettings from "@/settings";
import { Commit } from "vuex";

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;
const state = {
  theme: styles.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
};

const mutations = {
  CHANGE_SETTING: (
    state: { [key: string]: string },
    { key, value }: { key: string; value: string }
  ) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }: { commit: Commit }, data: any) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
