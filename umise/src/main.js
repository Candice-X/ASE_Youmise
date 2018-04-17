// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import jQuery from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuelidate from 'vuelidate';


Vue.use(Vuelidate);

import store from './store/store';

// const config = require('../config/config.env.json');

// axios.defaults.baseURL = config.SERVER_POST_PREFIX;

axios.defaults.baseURL = process.env.VUE_APP_SEVER_POST_PREFIX;

//authentication 
//add token to every request in the header


// axios.defaults.headers.common['Authorization'] = "test";


const token = localStorage.getItem('idToken');
console.log('token:', token);
  if ( token != null ) {
    axios.defaults.headers.common['Authorization'] = token;
  };


// console.log(config);
//add token to every request in the header
// axios.defaults.headers.common['Authorization'] = "test";

global.jQuery = jQuery;
// eslint-disable-next-line
const Bootstrap = require('bootstrap');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');