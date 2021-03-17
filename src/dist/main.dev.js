"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

require("../styles/index.css");

var _index2 = _interopRequireDefault(require("../packages/Toast/index"));

var _index3 = _interopRequireDefault(require("../packages/ScrollLoad/index"));

var _index4 = _interopRequireDefault(require("../packages/Loading/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;
_vue["default"].prototype.$toast = _index2["default"];

_vue["default"].use(_index3["default"]);

_vue["default"].use(_index4["default"]);

new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');