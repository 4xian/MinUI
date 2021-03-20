"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loopItem = _interopRequireDefault(require("../Loop/src/loop-item.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* istanbul ignore next */
_loopItem["default"].install = function (Vue) {
  Vue.component(_loopItem["default"].name, _loopItem["default"]);
};

var _default = _loopItem["default"];
exports["default"] = _default;