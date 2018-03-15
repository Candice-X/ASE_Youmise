import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Navbar from '@/components/Navbar';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/nav',
      name: 'nav',
      component: Navbar,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
  ],
});
