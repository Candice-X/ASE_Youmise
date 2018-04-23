<template>
  <div id="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#">
          <router-link to="/"> <img src="../assets/img/Logo.png" width='45' /><span class="logo"> Umise </span></router-link>
        </a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" 
        data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fa fa-bars"></i>
          </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link style="margin-left:15px;" to="/login" tag="li" active-class="active" exact>
                <a class="btn btn-sm btn-outline-success" style="font-size:1em;">Sign in</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link style="margin-left:15px;" tag="li" to="/signup" active-class="active" exact>
                <a class="btn btn-sm btn-outline-success" style="font-size:1em;"> Sign up</a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
  };
</script>

<style scoped>
  #mainNav {
    border-color: rgba(34, 34, 34, 0.05);
    /* background-color: white; */
    background-color: rgba(0, 0, 0, 0.2);
    transition: background 0.5s ease-in-out, padding 0.5s ease-in-out;
    -webkit-transition: all 0.35s;
    -moz-transition: all 0.35s;
    transition: all 0.35s;
    font-family: "Catamaran", "Helvetica", "Arial", "sans-serif";
    font-weight: 200;
    letter-spacing: 1px;
  }
  
  .active {
    background: #218838;
    color: #fff !important;
    border-radius: 5px !important;
  }
  
  .btn {
    border-radius: 5px !important;
    text-transform: none !important;
  }
  
  #mainNav .navbar-brand {
    color: #fff;
    font-family: "Catamaran", "Helvetica", "Arial", "sans-serif";
    font-weight: 200;
    letter-spacing: 1px;
  }
  
  #mainNav .navbar-brand:hover,
  #mainNav .navbar-brand:focus {
    color: #fcbd20;
  }
  
  #mainNav .navbar-toggler {
    font-size: 12px;
    padding: 8px 10px;
    color: #fff;
  }
  
  #mainNav .navbar-nav>li>a {
    font-size: 11px;
    font-family: "Lato", "Helvetica", "Arial", "sans-serif";
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  
  #mainNav .navbar-nav>li>a.active {
    color: #218838 !important;
    background-color: transparent;
  }
  
  #mainNav .navbar-nav>li>a.active:hover {
    background-color: transparent;
  }
  
  #mainNav .navbar-nav>li>a,
  #mainNav .navbar-nav>li>a:focus {
    color: #fff;
  }
  
  #mainNav .navbar-nav>li>a:hover,
  #mainNav .navbar-nav>li>a:focus:hover {
    color: #fff;
    font-weight: bold;
  }
  
  .logo {
    color: #fff;
    font-size: 1.2em;
    font-weight: 300;
  }
  
  #sideNav .navbar-nav .nav-item .nav-link {
    font-weight: 600;
    text-transform: uppercase;
  }

.login_cont li{
  list-style: none;
  padding:0;
  margin:0;
}

.login_cont span{
  padding:15px;
  line-height: 2em;
  margin:0;
}
.login_cont .left{
  border-radius: 5px 0 0 5px !important;
  color:#fff;

}
.login_cont .right{
  border-radius: 0 5px 5px 0 !important;
  color:#fff;
}
.login_cont .btn-success-active{
  background:#28a745;

}

</style>
