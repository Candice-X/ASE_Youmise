'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./common');

exports.default = function (max) {
  return (0, _common.withParams)({ type: 'maxValue', max: max }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +max;
  });
};