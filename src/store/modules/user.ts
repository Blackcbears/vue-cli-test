import { login, logout, getInfo } from "@/service/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router from "@/router";
import { Commit, Dispatch } from "vuex";

const state = {
    token: getToken(),
    name: "",
    avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    introduction: "",
    roles: []
};

const mutations = {
    SET_TOKEN: (state: { token: string }, token: string) => {
        state.token = token;
    },
    SET_INTRODUCTION: (
        state: { introduction: string },
        introduction: string
    ) => {
        state.introduction = introduction;
    },
    SET_NAME: (state: { name: string }, name: string) => {
        state.name = name;
    },
    SET_AVATAR: (state: { avatar: string }, avatar: string) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state: { roles: any }, roles: any) => {
        state.roles = roles;
    }
};

const actions = {
    // user login
    login(
        { commit }: { commit: Commit },
        userInfo: { username: string; password: string }
    ) {
        const { username, password } = userInfo;
        return new Promise<void>((resolve, reject) => {
            login({ username: username.trim(), password: password })
                .then(response => {
                    const { data } = response;
                    commit("SET_TOKEN", data.token);
                    setToken(data.token);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // get user info
    getInfo({ commit, state }: { commit: Commit; state: { token: string } }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then(response => {
                    const { data } = response;

                    if (!data) {
                        reject("Verification failed, please Login again.");
                    }

                    const { roles, name, avatar, introduction } = data;

                    // roles must be a non-empty array
                    if (!roles || roles.length <= 0) {
                        reject("getInfo: roles must be a non-null array!");
                    }

                    commit("SET_ROLES", roles);
                    commit("SET_NAME", name);
                    commit("SET_AVATAR", avatar);
                    commit("SET_INTRODUCTION", introduction);
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // user logout
    logout({
        commit,
        state,
        dispatch
    }: {
        commit: Commit;
        state: { token: string };
        dispatch: Dispatch;
    }) {
        return new Promise<void>((resolve, reject) => {
            logout(state.token)
                .then(() => {
                    commit("SET_TOKEN", "");
                    commit("SET_ROLES", []);
                    removeToken();
                    // 重设路由

                    // reset visited views and cached views
                    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                    dispatch("tagsView/delAllViews", null, { root: true });

                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // remove token
    resetToken({ commit }: { commit: Commit }) {
        return new Promise<void>(resolve => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
        });
    },

    // dynamically modify permissions
    async changeRoles(
        { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
        role: string
    ) {
        const token = role + "-token";

        commit("SET_TOKEN", token);
        setToken(token);

        const { roles } = await dispatch("getInfo");
        // 重设路由

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch(
            "permission/generateRoutes",
            roles,
            {
                root: true
            }
        );
        // dynamically add accessible routes
        router.addRoute(accessRoutes);

        // reset visited views and cached views
        await dispatch("tagsView/delAllViews", null, { root: true });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
