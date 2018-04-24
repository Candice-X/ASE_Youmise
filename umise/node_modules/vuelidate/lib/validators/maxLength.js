'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./common');

exports.default = function (length) {
  return (0, _common.withParams)({ type: 'maxLength', max: length }, function (value) {
    return !(0, _common.req)(value) || (0, _common.len)(value) <= length;
  });
};