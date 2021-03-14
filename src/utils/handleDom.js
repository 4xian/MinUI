// 添加事件监听
export const onListener = (function () {
    if (document.addEventListener) {
        return function (ele, event, func) {
            if (ele && event && func) {
                ele.addEventListener(event, func, false)
            }
        }
    } else {
        return function (ele, event, func) {

            if (ele && event && func) {
                ele.attachEvent('on' + event, func)
            }
        }
    }
})();

// 去除事件监听
export const offListener = (function () {
    if (document.addEventListener) {
        return function (ele, event, func) {
            if (ele && event && func) {
                ele.removeEventListener(event, func, false)
            }
        }
    } else {
        return function (ele, event, func) {
            if (ele && event && func) {
                ele.detachEvent('on' + event, func)
            }
        }
    }
})();

//生成随机数
export const randomID = (function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
})();