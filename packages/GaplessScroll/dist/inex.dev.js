"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gaplessScroll = _interopRequireDefault(require("./src/gapless-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_gaplessScroll["default"].install = function (Vue) {
  Vue.component(_gaplessScroll["default"].name, _gaplessScroll["default"]);
};

var _default = _gaplessScroll["default"];
exports["default"] = _default;