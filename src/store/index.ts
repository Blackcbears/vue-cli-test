import { createStore } from "vuex";
import modules from "./modules";
import getters from "./getters";

const store = createStore({
  modules,
  getters
});

export function useStore() {
  return store;
}
export default store;
