'use strict';

let expect = require('expect.js');
let SequelizeMock = require('sequelize-mock');

let dbMock = new SequelizeMock();

var UserMock = dbMock.define('user', {
  uid: 'b9993c3f-3fbd-4725-901b-d1560c065bfb',
  username: 'yinghai',
  email: '148306661@qq.com',
  firstName: 'yinghai',
  lastName: 'x',
  gender: 'female'
});
