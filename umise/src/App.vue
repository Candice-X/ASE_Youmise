<template>
  <div id="app">
    <dashboard-nav v-if="this.$store.state.user.isLogin"></dashboard-nav>
    
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import DashboardNav from './components/DashboardNav';


export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    Navbar,
    DashboardNav,
  },
};
</script>

<style>
@import "assets/css/font-awesome.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
a,
a:active,
a:hover {
  outline: none;
}
</style>
