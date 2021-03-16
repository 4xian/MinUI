"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _img = _interopRequireDefault(require("./src/img"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_img["default"].install = function (Vue) {
  Vue.component(_img["default"].name, _img["default"]);
};

var _default = _img["default"];
exports["default"] = _default;