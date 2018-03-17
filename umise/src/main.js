// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import jQuery from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import router from './router';

import { store } from './store/store';

global.jQuery = jQuery;
// eslint-disable-next-line
const Bootstrap = require('bootstrap');


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
});
