"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _icon = _interopRequireDefault(require("./src/icon.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* istanbul ignore next */
_icon["default"].install = function (Vue) {
  Vue.component(_icon["default"].name, _icon["default"]);
};

var _default = _icon["default"];
exports["default"] = _default;