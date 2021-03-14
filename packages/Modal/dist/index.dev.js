"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("./src/modal.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_modal["default"].install = function (Vue) {
  Vue.component(_modal["default"].name, _modal["default"]);
};

var _default = _modal["default"];
exports["default"] = _default;