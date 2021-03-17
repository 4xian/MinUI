"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _directive = _interopRequireDefault(require("./src/directive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  install: function install(Vue) {
    Vue.use(_directive["default"]);
  },
  directive: _directive["default"]
};
exports["default"] = _default;