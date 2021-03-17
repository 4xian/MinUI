"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};

    for (var prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        var value = source[prop];

        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}