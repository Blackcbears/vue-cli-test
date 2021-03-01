import { createStore } from "vuex";
import modules from "./modules";
import getters from "./getters";

const store = createStore({
  modules,
  getters
});

export default store;
