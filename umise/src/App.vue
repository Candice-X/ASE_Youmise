<template>
  <div id="app">
    <dashboard-nav v-if="this.$store.state.user.isLogin"></dashboard-nav>
  
    <router-view/>
    <!-- loading div -->
    <div v-if="this.$store.state.user.loading" class="loading_cont">
      <div class="container_dot">
        <div class="dot-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="dot-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="dot-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  
  </div>
  <!-- end of app div -->
</template>

<script>
  import Navbar from "./components/Navbar";
  import DashboardNav from "./components/DashboardNav";
  import facebook from "./api/facebook.js";
  
  export default {
    name: "App",
    data() {
      return {};
    },
  
    methods: {
  
    },
    components: {
      Navbar,
      DashboardNav
    }
  };
</script>

<style>
  @import "assets/css/font-awesome.min.css";
  body {
    font-size: 0.9em;
  }
  
  @media (max-width: 768px) {
    body {
      font-size: 0.8em;
      margin: 0;
      padding: 0;
    }
    .card_cont_mobile {
      /* float:none !important; */
      margin: auto !important;
    }
    .card_row {
      margin-left: 0 !important;
    }
    .card_img {
      margin-left: 0 !important;
    }
    .loading_cont {
      padding-left: 0 !important;
    }
  }
  
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #2c3e50; */
    /* margin-top: 60px; */
  }
  .alert_info{
    font-size:0.8em;
  }
  a,
  a:active,
  a:hover {
    outline: none;
  }
  
  .modal-dialog-centered {
    overflow: hidden;
  }
  
  .loading_cont {
    position: absolute;
    width: 100%;
    display: block;
    z-index: 999;
    margin: auto;
    text-align: center;
    background: none;
    padding-left: 300px;
    margin: auto;
    top: 380px;
  }
  
  
  /* loading */
  
  .container_dot,
  .dot-container {
    /* position: relative; */
    width: 100px;
    height: 100px;
  }
  
  .container_dot {
    margin: auto;
    transform-origin: center;
    animation: anirotate 10s linear infinite;
  }
  
  .dot-container {
    position: absolute;
    /* border: 0px solid #fff; */
    border-radius: 50px;
  }
  
  .dot-container:nth-child(2) {
    transform: rotate(40deg);
    .dot {
      /* //animation-delay: -0.35s; */
      animation-delay: -0.5s;
    }
  }
  
  .container_dot:nth-child(3) {
    transform: rotate(80deg);
    .dot {
      /* //animation-delay: -0.35s; */
      animation-delay: -1s;
    }
  }
  
  .dot {
    position: absolute;
    height: 10px;
    width: 10px;
    background: #fff;
    border-radius: 5px;
    transform: translate(0, 0);
  }
  
  .dot:nth-child(1) {
    top: 0;
    left: calc(50% - 5px);
    animation: ani1 2s infinite;
  }
  
  .dot:nth-child(2) {
    bottom: calc(28% - 5px);
    left: calc(11% - 5px);
    animation: ani2 2s infinite;
  }
  
  .dot:nth-child(3) {
    bottom: calc(28% - 5px);
    right: calc(11% - 5px);
    animation: ani3 2s infinite;
  }
  
  [hidden] {
    display: none;
  }
  
  @keyframes anirotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-359deg);
    }
  }
  
  @keyframes ani1 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-40px, 67px);
    }
  }
  
  @keyframes ani2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(77px, 0);
    }
  }
  
  @keyframes ani3 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-39px, -67px);
    }
  }
  
  .card_row {
    margin-bottom: 30px!important;
  }
</style>
