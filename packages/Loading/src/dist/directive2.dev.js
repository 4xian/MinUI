"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _loading = _interopRequireDefault(require("./loading.vue"));

var _dom = require("../../../src/utils/dom");

var _popup = require("../../../src/utils/popup");

var _afterLeave = _interopRequireDefault(require("../../../src/utils/after-leave"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Mask = _vue["default"].extend(_loading["default"]);

var loadingDirective = {};

loadingDirective.install = function (Vue) {
  if (Vue.prototype.$isServer) return;

  var toggleLoading = function toggleLoading(el, binding) {
    if (binding.value) {
      Vue.nextTick(function () {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = (0, _dom.getStyle)(document.body, 'position');
          el.originalOverflow = (0, _dom.getStyle)(document.body, 'overflow');
          el.maskStyle.zIndex = _popup.PopupManager.nextZIndex();
          (0, _dom.addClass)(el.mask, 'is-loading-fullscreen');
          insertDom(document.body, el, binding);
        } else {
          (0, _dom.removeClass)(el.mask, 'is-loading-fullscreen');

          if (binding.modifiers.body) {
            el.originalPosition = (0, _dom.getStyle)(document.body, 'position');
            ['top', 'left'].forEach(function (property) {
              var scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
              el.maskStyle[property] = el.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] - parseInt((0, _dom.getStyle)(document.body, "margin-".concat(property)), 10) + 'px';
            });
            ['height', 'width'].forEach(function (property) {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
            });
            insertDom(document.body, el, binding);
          } else {
            el.originalPosition = (0, _dom.getStyle)(el, 'position');
            insertDom(el, el, binding);
          }
        }
      });
    } else {
      (0, _afterLeave["default"])(el.instance, function () {
        if (!el.instance.hiding) return;
        el.domVisible = false;
        var target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el;
        (0, _dom.removeClass)(target, 'min-loading-parent'); // removeClass(target, 'el-loading-parent--hidden');

        el.instance.hiding = false;
      }, 300, true);
      el.instance.isshow = false;
      el.instance.hiding = true;
    }
  };

  var insertDom = function insertDom(parent, el) {
    if (!el.domVisible && (0, _dom.getStyle)(el, 'display') !== 'none' && (0, _dom.getStyle)(el, 'visibility') !== 'hidden') {
      Object.keys(el.maskStyle).forEach(function (property) {
        el.mask.style[property] = el.maskStyle[property];
      });

      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        (0, _dom.addClass)(parent, 'min-loading-parent');
      } //   if (binding.modifiers.fullscreen && binding.modifiers.lock) {
      //     addClass(parent, 'el-loading-parent--hidden');
      //   }


      el.domVisible = true;
      parent.appendChild(el.mask);
      Vue.nextTick(function () {
        if (el.instance.hiding) {//   el.instance.$emit('after-leave');
        } else {
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

      var mask = new Mask({
        el: document.createElement('div'),
        data: {
          tip: vm && _tip || '正在加载中...',
          icon: vm && _icon || 'min-icon-loading',
          background: vm && _background || vm[_background],
          className: vm && _className || vm[_className],
          fullscreen: !!binding.modifiers.fullscreen,
          color: vm && _color || '#fff'
        }
      });
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};
      binding.value && toggleLoading(el, binding);
    },
    update: function update(el, binding) {
      el.instance.handleTip(el.getAttribute('min-loading-tip'));

      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function unbind(el, binding) {
      if (el.domInserted) {
        el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask);
        toggleLoading(el, {
          value: false,
          modifiers: binding.modifiers
        });
      }

      el.instance && el.instance.$destroy();
    }
  });
};

var _default = loadingDirective;
exports["default"] = _default;