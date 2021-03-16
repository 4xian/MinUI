"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOwnProperty = isOwnProperty;
exports.rafThrottle = rafThrottle;
exports.isFirefox = exports.isEdge = exports.isIE = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isOwnProperty(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function rafThrottle(fn) {
  var locked = false;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (locked) return;
    locked = true;
    window.requestAnimationFrame(function () {
      fn.apply(_this, args);
      locked = false;
    });
  };
}

var isIE = function isIE() {
  return !_vue["default"].prototype.$isServer && !isNaN(Number(document.documentMode));
};

exports.isIE = isIE;

var isEdge = function isEdge() {
  return !_vue["default"].prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

exports.isEdge = isEdge;

var isFirefox = function isFirefox() {
  return !_vue["default"].prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
};

exports.isFirefox = isFirefox;