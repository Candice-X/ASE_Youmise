'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// In browser, validators should be independent from Vuelidate.
// The only usecase those do need to be dependent is when you need $params.
// To make the dependency optional, try to grab Vuelidate from global object,
// fallback to stubbed WithParams on failure.

var root = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};

/* istanbul ignore next */
var fakeWithParams = function fakeWithParams(paramsOrClosure, maybeValidator) {
  if (typeof paramsOrClosure === 'object' && maybeValidator !== undefined) {
    return maybeValidator;
  }
  return paramsOrClosure(function () {});
};

var withParams = exports.withParams = root.vuelidate ? root.vuelidate.withParams : fakeWithParams;