"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mark = _interopRequireDefault(require("./src/mark.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mark["default"].install = function (Vue) {
  Vue.component(_mark["default"].name, _mark["default"]);
};

var _default = _mark["default"];
exports["default"] = _default;