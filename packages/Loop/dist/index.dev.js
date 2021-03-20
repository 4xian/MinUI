"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loop = _interopRequireDefault(require("./src/loop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* istanbul ignore next */
_loop["default"].install = function (Vue) {
  Vue.component(_loop["default"].name, _loop["default"]);
};

var _default = _loop["default"];
exports["default"] = _default;