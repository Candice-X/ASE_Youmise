import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Navbar from '@/components/Navbar';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'/nav',
      name:'nav',
      component:Navbar,
    },
  ],
});
