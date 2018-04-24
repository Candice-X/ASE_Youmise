'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./common');

exports.default = function () {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return (0, _common.withParams)({ type: 'macAddress' }, function (value) {
    if (!(0, _common.req)(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    var parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;

    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  });
};

var hexValid = function hexValid(hex) {
  return hex.toLowerCase().match(/^[0-9a-f]{2}$/);
};