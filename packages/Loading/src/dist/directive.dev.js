"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _loading = _interopRequireDefault(require("./loading.vue"));

var _dom = require("../../../src/utils/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import  from ''
var LoadingConstructor = _vue["default"].extend(_loading["default"]);

var _directive = {};

_directive.install = function (Vue) {
  if (Vue.prototype.isServer) return;

  var handleLoading = function handleLoading(el, binding) {
    if (binding.value) {
      Vue.nextTick(function () {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = (0, _dom.getStyle)(document.body, 'position');
          el.originalOverflow = (0, _dom.getStyle)(document.body, 'overflow'); // el.loadingStyle.zIndex = 2001;

          (0, _dom.addClass)(el.loading, 'is-loading-fullscreen');
          insertDom(document.body, el, binding);
        } else {
          (0, _dom.removeClass)(el.loading, 'is-loading-fullscreen');

          if (binding.modifiers.body) {
            el.originalPosition = (0, _dom.getStyle)(document.body, 'position');
            ['top', 'left'].forEach(function (property) {
              var scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
              el.loadingStyle[property] = el.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] - parseInt((0, _dom.getStyle)(document.body, "margin-".concat(property)), 10) + 'px';
            });
            ['height', 'width'].forEach(function (property) {
              el.loadingStyle[property] = el.getBoundingClientRect()[property] + 'px';
            });
            insertDom(document.body, el, binding);
          } else {
            el.originalPosition = (0, _dom.getStyle)(el, 'position');
            insertDom(el, el, binding);
          }
        }
      });
    } else {
      el.domVisible = false;
      var target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el;
      (0, _dom.removeClass)(target, 'min-loading-parent');
      el.instance.visible = false;
      el.instance.hiding = true;
    }
  };

  var insertDom = function insertDom(parent, el) {
    if (!el.domVisible && (0, _dom.getStyle)(el, 'display') !== 'none' && (0, _dom.getStyle)(el, 'visibility' !== 'hidden')) {
      Object.keys(el.loadingStyle).forEach(function (item) {
        el.loading.style[item] = el.loadingStyle[item];
      });

      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        (0, _dom.addClass)(parent, 'min-loading-parent');
      }

      el.domVisible = true;
      parent.appendChild(el.loading);
      Vue.nextTick(function () {
        if (!el.instance.hiding) {
          el.instance.isshow = true;
        }
      });
      el.domInserted = true;
    } else if (el.domVisible && el.instance.hiding === true) {
      el.instance.isshow = true;
      el.instance.hiding = false;
    }
  };

  Vue.directive('loading', {
    bind: function bind(el, binding, vnode) {
      var _tip = el.getAttribute('min-loading-tip'),
          _icon = el.getAttribute('min-loading-icon'),
          _background = el.getAttribute('min-loading-background'),
          _className = el.getAttribute('min-loading-className'),
          _color = el.getAttribute('min-loading-color'),
          vm = vnode.context;

      var loading = new LoadingConstructor({
        el: document.createComment('div'),
        data: {
          tip: vm && vm[_tip] || _tip,
          icon: vm && vm[_icon] || _icon,
          background: vm && vm[_background] || _background,
          className: vm && vm[_className] || _className,
          fullscreen: !!binding.modifiers.fullscreen,
          color: vm && vm[_color] || _color
        }
      });
      el.instance = loading;
      el.loading = loading.$el;
      el.loadingStyle = {};
      binding.value && handleLoading(el, binding);
    },
    update: function update(el, binding) {
      el.instance.handleTip(el.getAttribute('min-loading-tip'));
      if (binding.oldValue !== binding.value) handleLoading(el, binding);
    },
    unbind: function unbind(el, binding) {
      if (el.domInserted) {
        el.loading && el.loading.parentNode && el.loading.parentNode.removeChild(el.loading);
        handleLoading(el, {
          value: false,
          modifiers: binding.modifiers
        });
      }

      el.instance && el.instance.$destroy();
    }
  });
};

var _default = _directive;
exports["default"] = _default;