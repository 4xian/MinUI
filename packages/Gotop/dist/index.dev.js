"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gotop = _interopRequireDefault(require("./src/gotop.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* istanbul ignore next */
_gotop["default"].install = function (Vue) {
  Vue.component(_gotop["default"].name, _gotop["default"]);
};

var _default = _gotop["default"];
exports["default"] = _default;