import { Commit } from "vuex";

const state = {
  logs: []
};

const mutations = {
  ADD_ERROR_LOG: (state: { logs: any[] }, log: any) => {
    state.logs.push(log);
  },
  CLEAR_ERROR_LOG: (state: { logs: any[] }) => {
    state.logs.splice(0);
  }
};

const actions = {
  addErrorLog({ commit }: { commit: Commit }, log: any) {
    commit("ADD_ERROR_LOG", log);
  },
  clearErrorLog({ commit }: { commit: Commit }) {
    commit("CLEAR_ERROR_LOG");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
