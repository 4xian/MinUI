"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOwnProperty = isOwnProperty;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isOwnProperty(obj, key) {
  return hasOwnProperty.call(obj, key);
}