import Cookies from "js-cookie";

const TKOEN_KEY = "Admin-Token";

export function getToken() {
  return Cookies.get(TKOEN_KEY);
}

export function setToken(token: string) {
  return Cookies.set(TKOEN_KEY, token);
}

export function removeToken() {
  return Cookies.remove(TKOEN_KEY);
}
