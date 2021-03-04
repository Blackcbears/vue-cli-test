/**
 * @name: index
 * @author: CuiJing
 * @date: 2021/3/5 1:21
 * @description：
 * @update: 2021/3/5 1:21
 */
import Cookies from "js-cookie";
import { Commit } from "vuex";
import { AppMutationTypes } from "./MutationTypes";
import { AppTypes, DeviceType } from "./AppTypes";

const state = {
  sidebar: {
    opened: Cookies.get("sidebarStatus")
      ? Cookies.get("sidebarStatus") === "1"
      : true,
    withoutAnimation: false
  },
  device: DeviceType.Desktop,
  size: Cookies.get("size") || "medium"
};

const mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR]: (state: {
    sidebar: { opened: boolean; withoutAnimation: boolean };
  }) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", "1");
    } else {
      Cookies.set("sidebarStatus", "0");
    }
  },
  [AppMutationTypes.CLOSE_SIDEBAR]: (
    state: { sidebar: { opened: boolean; withoutAnimation: boolean } },
    withoutAnimation: boolean
  ) => {
    Cookies.set("sidebarStatus", "0");
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  [AppMutationTypes.TOGGLE_DEVICE]: (
    state: { device: DeviceType },
    device: DeviceType
  ) => {
    state.device = device;
  },
  [AppMutationTypes.SET_SIZE]: (state: { size: string }, size: string) => {
    state.size = size;
    Cookies.set("size", size);
  }
};

const actions = {
  [AppTypes.APP_TOGGLE_SIDEBAR]({ commit }: { commit: Commit }) {
    commit(AppMutationTypes.TOGGLE_SIDEBAR);
  },
  [AppTypes.APP_CLOSE_SIDEBAR](
    { commit }: { commit: Commit },
    { withoutAnimation }: { withoutAnimation: boolean }
  ) {
    commit(AppMutationTypes.CLOSE_SIDEBAR, withoutAnimation);
  },
  [AppTypes.APP_TOGGLE_DEVICE](
    { commit }: { commit: Commit },
    device: DeviceType
  ) {
    commit(AppMutationTypes.TOGGLE_DEVICE, device);
  },
  [AppTypes.APP_SET_SIZE]({ commit }: { commit: Commit }, size: string) {
    commit(AppMutationTypes.SET_SIZE, size);
  }
};

export default {
  namespaced: false,
  state,
  mutations,
  actions
};
