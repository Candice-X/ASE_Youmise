// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import jQuery from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import router from './router';
import axios from 'axios';

import { store } from './store/store';

// axios.defaults.baseURL = "http://cat-named-doggie-dev.us-east-2.elasticbeanstalk.com";
//add token to every request in the header
// axios.defaults.headers.common['Authorization'] = "test";

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
