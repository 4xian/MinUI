"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scrollLoad = _interopRequireDefault(require("./src/scroll-load"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_scrollLoad["default"].install = function (Vue) {
  Vue.directive(_scrollLoad["default"].name, _scrollLoad["default"]);
};

var _default = _scrollLoad["default"];
exports["default"] = _default;