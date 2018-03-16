<template>
<div id="Navbar">
 <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#">
         <router-link to="/"> <img src="../assets/img/Logo.png" width='45' /><span class="logo"> Umise </span></router-link></a>
        <button class="navbar-toggler navbar-toggler-right"
        type="button" data-toggle="collapse" data-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to='/'>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/#Features">Features</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/#About">About US</router-link>
            </li> -->
            <li class="nav-item">
              <router-link  style="margin-left:15px;" to="/login"><a class="btn btn-sm btn-success"
              style="font-size:1em;" >Sign in</a></router-link>
            </li>
            <li class="nav-item">
              <router-link  style="margin-left:15px;" to="/signup"><a class="btn btn-sm btn-outline-success" style="font-size:1em;"> Sign up</a></router-link>
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

<style>
router-link {
background:none;
border:none;
}
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

#mainNav .navbar-nav > li > a {
  font-size: 11px;
  font-family: "Lato", "Helvetica", "Arial", "sans-serif";
  letter-spacing: 2px;
  text-transform: uppercase;
}

#mainNav .navbar-nav > li > a.active {
  color: #218838 !important;
  background-color: transparent;
}

#mainNav .navbar-nav > li > a.active:hover {
  background-color: transparent;
}

#mainNav .navbar-nav > li > a,
#mainNav .navbar-nav > li > a:focus {
  color: #fff;
}

#mainNav .navbar-nav > li > a:hover,
#mainNav .navbar-nav > li > a:focus:hover {
  color: #fff;
  font-weight: bold;
}
.logo {
  color: #fff;
  font-size: 1.2em;
  font-weight: 300;
}

@media (min-width: 992px) {
  #mainNav {
    border-color: transparent;
    background-color: rgba(34, 34, 34, 0.5);
  }
  #mainNav .navbar-brand {
    color: fade(white, 70%);
  }
  #mainNav .navbar-brand:hover,
  #mainNav .navbar-brand:focus {
    color: white;
  }
  #mainNav .navbar-nav > li > a,
  #mainNav .navbar-nav > li > a:focus {
    color: white;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
  }
  #mainNav .navbar-nav > li > a:hover,
  #mainNav .navbar-nav > li > a:focus:hover {
    color: white;
    font-weight: bold;
  }
  #mainNav.navbar-shrink {
    border-color: rgba(34, 34, 34, 0.1);
    background-color: white;
  }
  #mainNav.navbar-shrink .navbar-brand {
    color: #222222;
  }
  #mainNav.navbar-shrink .navbar-brand:hover,
  #mainNav.navbar-shrink .navbar-brand:focus {
    color: #fdcc52;
  }
  #mainNav.navbar-shrink .navbar-nav > li > a,
  #mainNav.navbar-shrink .navbar-nav > li > a:focus {
    color: #222222;
  }
  #mainNav.navbar-shrink .navbar-nav > li > a:hover,
  #mainNav.navbar-shrink .navbar-nav > li > a:focus:hover {
    color: #fdcc52;
  }
  .navbar-expand-lg .navbar-nav .nav-link {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
}
</style>
