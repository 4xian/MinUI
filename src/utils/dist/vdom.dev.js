"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isProperty = isProperty;

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isProperty(node) {
  return node !== null && _typeof(node) === 'object' && (0, _utils.isOwnProperty)(node, 'componentOptions');
}