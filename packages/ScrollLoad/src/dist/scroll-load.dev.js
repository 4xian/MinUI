"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _throttleDebounce = require("throttle-debounce");

var _istypes = require("../../../src/utils/istypes");

var _dom = require("../../../src/utils/dom");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getStyleComputedProperty = function getStyleComputedProperty(element, property) {
  if (element === window) {
    element = document.documentElement;
  }

  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
};

var entries = function entries(obj) {
  return Object.keys(obj || {}).map(function (key) {
    return [key, obj[key]];
  });
};

var getPositionSize = function getPositionSize(el, prop) {
  return el === window || el === document ? document.documentElement[prop] : el[prop];
};

var getOffsetHeight = function getOffsetHeight(el) {
  return getPositionSize(el, 'offsetHeight');
};

var getClientHeight = function getClientHeight(el) {
  return getPositionSize(el, 'clientHeight');
};

var scope = 'MinScrollLoad';
var attributes = {
  delay: {
    type: Number,
    "default": 200
  },
  distance: {
    type: Number,
    "default": 0
  },
  disabled: {
    type: Boolean,
    "default": false
  },
  immediate: {
    type: Boolean,
    "default": true
  }
};

var getScrollOptions = function getScrollOptions(el, vm) {
  if (!(0, _istypes.isHtmlElement)(el)) return {};
  return entries(attributes).reduce(function (map, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        option = _ref2[1];

    var type = option.type,
        defaultValue = option["default"];
    var value = el.getAttribute("scroll-load-".concat(key));
    value = (0, _istypes.isUndefined)(vm[value]) ? value : vm[value];

    switch (type) {
      case Number:
        value = Number(value);
        value = Number.isNaN(value) ? defaultValue : value;
        break;

      case Boolean:
        value = (0, _istypes.isDefined)(value) ? value === 'false' ? false : Boolean(value) : defaultValue;
        break;

      default:
        value = type(value);
    }

    map[key] = value;
    return map;
  }, {});
};

var getElementTop = function getElementTop(el) {
  return el.getBoundingClientRect().top;
};

var handleScroll = function handleScroll(cb) {
  var _this$scope = this[scope],
      el = _this$scope.el,
      vm = _this$scope.vm,
      container = _this$scope.container,
      observer = _this$scope.observer;

  var _getScrollOptions = getScrollOptions(el, vm),
      distance = _getScrollOptions.distance,
      disabled = _getScrollOptions.disabled;

  if (disabled) return;
  var containerInfo = container.getBoundingClientRect();
  if (!containerInfo.width && !containerInfo.height) return;
  var shouldTrigger = false;

  if (container === el) {
    // be aware of difference between clientHeight & offsetHeight & window.getComputedStyle().height
    var scrollBottom = container.scrollTop + getClientHeight(container);
    shouldTrigger = container.scrollHeight - scrollBottom <= distance;
  } else {
    var heightBelowTop = getOffsetHeight(el) + getElementTop(el) - getElementTop(container);
    var offsetHeight = getOffsetHeight(container);
    var borderBottom = Number.parseFloat(getStyleComputedProperty(container, 'borderBottomWidth'));
    shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance;
  }

  if (shouldTrigger && (0, _istypes.isFunction)(cb)) {
    cb.call(vm);
  } else if (observer) {
    observer.disconnect();
    this[scope].observer = null;
  }
};

var _default = {
  name: 'ScrollLoad',
  inserted: function inserted(el, binding, vnode) {
    var cb = binding.value;
    var vm = vnode.context; // only include vertical scroll

    var container = (0, _dom.getScrollContainer)(el, true);

    var _getScrollOptions2 = getScrollOptions(el, vm),
        delay = _getScrollOptions2.delay,
        immediate = _getScrollOptions2.immediate;

    var onScroll = (0, _throttleDebounce.throttle)(delay, handleScroll.bind(el, cb));
    el[scope] = {
      el: el,
      vm: vm,
      container: container,
      onScroll: onScroll
    };

    if (container) {
      container.addEventListener('scroll', onScroll);

      if (immediate) {
        var observer = el[scope].observer = new MutationObserver(onScroll);
        observer.observe(container, {
          childList: true,
          subtree: true
        });
        onScroll();
      }
    }
  },
  unbind: function unbind(el) {
    var _el$scope = el[scope],
        container = _el$scope.container,
        onScroll = _el$scope.onScroll;

    if (container) {
      container.removeEventListener('scroll', onScroll);
    }
  }
};
exports["default"] = _default;