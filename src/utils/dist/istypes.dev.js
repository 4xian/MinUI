"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = isString;
exports.isObject = isObject;
exports.isHtmlElement = isHtmlElement;
exports.isDefined = exports.isUndefined = exports.isFunction = void 0;

function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

var isFunction = function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

exports.isFunction = isFunction;

var isUndefined = function isUndefined(val) {
  return val === void 0;
};

exports.isUndefined = isUndefined;

var isDefined = function isDefined(val) {
  return val !== undefined && val !== null;
};

exports.isDefined = isDefined;