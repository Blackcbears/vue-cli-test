/**
 * Created by CuiJing on 1/3/21.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: string | number | object, cFormat: string) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date: Date;
    if (typeof time === "object") {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        date = <Date>time;
    } else {
        if (typeof time === "string") {
            if (/^[0-9]+$/.test(time)) {
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), "/");
            }
        }

        if (typeof time === "number" && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj: { [key: string]: number } = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr: string = format.replace(
        /{([ymdhisa])+}/g,
        (result, key: string) => {
            const value = formatObj[key];
            // Note: getDay() returns 0 on Sunday
            if (key === "a") {
                return ["日", "一", "二", "三", "四", "五", "六"][value];
            }
            return value.toString().padStart(2, "0");
        }
    );
    return timeStr;
}

/**
 * 时间戳处理函数，获得当前时间差距
 * @param {number} time 传入时间戳
 * @param {string} option 时间选项
 * @returns {string} 返回信息
 */
export function formatTime(time: number, option: string) {
    if (("" + time).length === 10) {
        time = time * 1000;
    } else {
        time = +time;
    }
    const d: Date = new Date(time);
    const now = Date.now();

    const diff = (now - time) / 1000;

    if (diff < 30) {
        return "刚刚";
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + "分钟前";
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "小时前";
    } else if (diff < 3600 * 24 * 2) {
        return "1天前";
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            "月" +
            d.getDate() +
            "日" +
            d.getHours() +
            "时" +
            d.getMinutes() +
            "分"
        );
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url: string | null) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf("?") + 1);
    const obj: { [key: string]: string } = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name: string = decodeURIComponent($1);
        obj[name] = decodeURIComponent($2);
        return rs;
    });
    return obj;
}

/**
 * @param {string} str value
 * @returns {number} output value
 */
export function byteLength(str: string) {
    // returns the byte length of an utf8 string
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xdc00 && code <= 0xdfff) i--;
    }
    return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual: string | any[]) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
    const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
    if (!search) {
        return {};
    }
    const obj: { [key: string]: string } = {};
    const searchArr = search.split("&");
    searchArr.forEach(v => {
        const index = v.indexOf("=");
        if (index !== -1) {
            const name = v.substring(0, index);
            obj[name] = v.substring(index + 1, v.length);
        }
    });
    return obj;
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val: string) {
    const div = document.createElement("div");
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target: object, source: object): object {
    if (typeof target !== "object") {
        target = {};
    }
    if (Array.isArray(source)) {
        return source.slice();
    }
    Object.keys(source).forEach(property => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const sourceProperty = source[property];
        if (typeof sourceProperty === "object") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            target[property] = objectMerge(target[property], sourceProperty);
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            target[property] = sourceProperty;
        }
    });
    return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(
    element: { className: any },
    className: string | any[]
) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += "" + className;
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type: string) {
    if (type === "start") {
        return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
        return new Date(new Date().toDateString());
    }
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr: Iterable<unknown> | null | undefined) {
    return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + "";
    const randomNum = (1 + Math.random()) * 65536 + "";
    return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: { className: string }, cls: string) {
    return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: { className: any }, cls: string) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: { className: any }, cls: string) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}
