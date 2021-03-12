"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _textTip = _interopRequireDefault(require("./src/textTip.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_textTip["default"].install = function (Vue) {
  Vue.component(_textTip["default"].name, _textTip["default"]);
};

var _default = _textTip["default"];
exports["default"] = _default;