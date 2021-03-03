import { createStore } from "vuex";
import modules from "./modules";
import getters from "./getters";

const store = createStore({
  modules,
  getters
});

export type Store = AppStore<Pick<RootState, "app">> &
  SettingStore<Pick<RootState, "settings">> &
  PermissionStore<Pick<RootState, "permission">> &
  UserStore<Pick<RootState, "user">> &
  TagsStore<Pick<RootState, "tagViews">>;

export function useStore(): Store {
  return store as Store;
}
export default store;
