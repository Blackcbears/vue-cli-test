/**
* @auther: CuiJing
* @description: 验证工具类
* @date: 2021/02/24 16:57
*/
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}