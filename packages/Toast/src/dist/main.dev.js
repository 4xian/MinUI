"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _toast = _interopRequireDefault(require("./toast.vue"));

var _vdom = require("../../../src/utils/vdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var childConstructor = _vue["default"].extend(_toast["default"]),
    instance,
    // instanceArr = [],
index = 1;

var Toast = function Toast() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (_vue["default"].prototype.$isServer) return;

  if (typeof options === 'string') {
    options = {
      toast: options
    };
  }

  var id = 'toast_' + index++;
  instance = new childConstructor({
    data: options
  });
  instance.id = id;

  if ((0, _vdom.isProperty)(instance.toast)) {
    instance.$slots["default"] = [instance.toast];
    instance.$slots.title = [instance.title];
    instance.title = null;
    instance.toast = null;
  }

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  return instance;
};

var typeArr = ['white', 'primary', 'info', 'success', 'warning', 'error', 'fail'];
typeArr.forEach(function (type) {
  Toast[type] = function (options) {
    if (typeof options === 'string') {
      options = {
        toast: options
      };
    }

    options.type = type;
    return Toast(options);
  };
});
var _default = Toast;
exports["default"] = _default;