"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _link = _interopRequireDefault(require("./src/link.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_link["default"].install = function (Vue) {
  Vue.component(_link["default"].name, _link["default"]);
};

var _default = _link["default"];
exports["default"] = _default;