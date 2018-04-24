'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* istanbul ignore next */
var withParams = 'lib' === 'web' ? require('./withParamsBrowser').withParams : require('./params').withParams;

exports.default = withParams;