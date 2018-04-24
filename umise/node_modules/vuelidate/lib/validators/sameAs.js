'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./common');

exports.default = function (equalTo) {
  return (0, _common.withParams)({ type: 'sameAs', eq: equalTo }, function (value, parentVm) {
    return value === (0, _common.ref)(equalTo, this, parentVm);
  });
};