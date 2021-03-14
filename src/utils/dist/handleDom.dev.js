"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomID = exports.offListener = exports.onListener = void 0;

// 添加事件监听
var onListener = function () {
  if (document.addEventListener) {
    return function (ele, event, func) {
      if (ele && event && func) {
        ele.addEventListener(event, func, false);
      }
    };
  } else {
    return function (ele, event, func) {
      if (ele && event && func) {
        ele.attachEvent('on' + event, func);
      }
    };
  }
}(); // 去除事件监听


exports.onListener = onListener;

var offListener = function () {
  if (document.addEventListener) {
    return function (ele, event, func) {
      if (ele && event && func) {
        ele.removeEventListener(event, func, false);
      }
    };
  } else {
    return function (ele, event, func) {
      if (ele && event && func) {
        ele.detachEvent('on' + event, func);
      }
    };
  }
}(); //生成随机数


exports.offListener = offListener;

var randomID = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}();

exports.randomID = randomID;