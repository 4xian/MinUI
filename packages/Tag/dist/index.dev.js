"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tag = _interopRequireDefault(require("./src/tag.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_tag["default"].install = function (Vue) {
  Vue.component(_tag["default"].name, _tag["default"]);
};

var _default = _tag["default"];
exports["default"] = _default;