import request from "@/utils/request";
import { LOGOUT, LOGIN, USERINFO } from "./api";
/**
 *
 * @param data
 */
export interface LoginData {
    username: string;
    password: string;
}
export function login(data: LoginData) {
    return request({
        url: LOGIN,
        method: "post",
        data
    });
}

/**
 * 获取用户信息
 * @param token token信息
 */
export function getInfo(token: string) {
    return request({
        url: USERINFO,
        method: "get",
        params: { token }
    });
}

/**
 * 注销登录
 * @param token token信息
 */
export function logout(token: string) {
    return request({
        url: LOGOUT,
        method: "post",
        params: { token }
    });
}
