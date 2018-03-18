import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Navbar from '@/components/Navbar';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Dashboard from '@/components/Dashboard';
import Mycard from '@/components/Mycard';
// import DashboardNav from '@/components/DashboardNav';
import Friends from '@/components/Friends';
import About from '@/components/About';
import Messages from '@/components/Messages';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/mycard',
    name: 'mycard',
    component: Mycard,
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
  },
  ],
});
