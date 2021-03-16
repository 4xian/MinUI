import Vue from 'vue';
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isOwnProperty(obj, key) {
    return hasOwnProperty.call(obj, key);
}

export function rafThrottle(fn) {
    let locked = false;
    return function (...args) {
        if (locked) return;
        locked = true;
        window.requestAnimationFrame(() => {
            fn.apply(this, args);
            locked = false;
        });
    };
}

export const isIE = function () {
    return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
};

export const isEdge = function () {
    return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

export const isFirefox = function () {
    return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
};