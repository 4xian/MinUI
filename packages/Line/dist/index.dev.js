"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _line = _interopRequireDefault(require("./src/line.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_line["default"].install = function (Vue) {
  Vue.component(_line["default"].name, _line["default"]);
};

var _default = _line["default"];
exports["default"] = _default;