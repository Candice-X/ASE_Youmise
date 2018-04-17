<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
      <router-link to="/account" ><a class="navbar-brand js-scroll-trigger" href="#page-top">
        <span class="d-block d-lg-none">Umise</span>
        <span class="d-none d-lg-block">
          <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="../assets/img/Logo.png" alt="">
        </span>
      </a>
      </router-link>
      <div class="profile-usertitle-name">{{ name }}</div>
        <hr />
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <router-link tag="li" to="/mycard" active-class="nav_active"  class="nav-item" default>
            <a class="nav-link js-scroll-trigger" ><i class="icon-layers"></i>My Cards</a>
          </router-link>
          <router-link tag="li" to="/dashboard" active-class="nav_active"  class="nav-item">
            <a class="nav-link js-scroll-trigger" > <i class="icon-directions"></i>Send Cards</a>
          </router-link>
         <router-link tag="li" to="/friends" active-class="nav_active"  class="nav-item">
            <a class="nav-link js-scroll-trigger" ><i class="icon-people"></i>Friends</a>
        </router-link>
        <router-link tag="li" to="/messages" active-class="nav_active"  class="nav-item">
            <a class="nav-link js-scroll-trigger" >
              <!-- <i class="icon-bubbles">
              </i>Messages   -->
              <!-- <div class="dot_indicator"> </div> -->
              </a>
          </router-link>
         <router-link tag="li" to="/about" active-class="nav_active"  class="nav-item">
            <a class="nav-link js-scroll-trigger" ><i class="icon-directions"> </i>About</a>
         </router-link>
        <li @click="logoutUser" >
            <a class=" nav-link js-scroll-trigger logout" style="text-decoration:none;" ><i class="icon-logout"> </i>Log out</a>
        </li>
        
        </ul>
       
      </div>
  
    </nav>
</template>

<script>


// const img1 = require('../../static/card/1.jpg');
// const img2 = require('../../static/card/2.jpg');
// const img3 = require('../../static/card/3.png');
// const img4 = require('../../static/card/4.png');
// const img5 = require('../../static/card/5.png');
// const img6 = require('../../static/card/6.png');
// const img7 = require('../../static/card/7.png');
// const img8 = require('../../static/card/8.png');
// const img9 = require('../../static/card/9.png');
// const img10 = require('../../static/card/10.png');
// const img11 = require('../../static/card/11.png');
// const img12 = require('../../static/card/12.png');
// const img13 = require('../../static/card/card1.png');
// const img14 = require('../../static/card/card2.png');

const girl = require('../../static/girl.png');
const boy = require('../../static/Logo.png');



export default {
  data() {
    return {
      name: this.$store.getters.getUserName,
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logout',this.$router);
    }
  }

};
</script>


<style scoped>
@import "../assets/css/font-awesome.min.css";
@import "../assets/css/simple-line-icons.css";

/* body {
  font-family: "Open Sans", serif;
  padding-top: 54px;
  color: #868e96;
} */

@media (min-width: 992px) {
  /* #nav_dashboard {
    padding-top: 0;
    padding-left: 17rem;
  } */
  .send_cards_container {
    height: auto;
    margin-top: 0px;
    margin-left: 0rem;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  color: #343a40;
}

h1 {
  font-size: 6rem;
  line-height: 5.5rem;
}

h2 {
  font-size: 3.5rem;
}
.card_img h4 {
  margin-top: 15px;
  font-size: 0.9rem;
}
.card_img p {
  font-size: 0.7rem;
}
.subheading {
  font-weight: 500;
  font-size: 1.35rem;
}
li {
  text-align: left;
  font-size: 0.8rem;
  margin: 5px;
  padding: 2px;
}
li:hover {
  background: #aaa;
  color: #000;
  border-radius: 3px;
}
li a {
  color: #ffffff;
}
li:hover,
a:hover {
  color: #fff !important;
}

.nav_active {
  background: #3ac17e !important;
  color: #ffffff;
  border-radius: 3px;
}

li:active {
  background: #3ac17e;
  color: #ffffff;
  border-radius: 3px;
}

#sideNav .navbar-nav .nav-item .nav-link {
  font-weight: 600;
  float:left;
  text-transform: uppercase;
}

@media (min-width: 992px) {
  #sideNav {
    text-align: center;
    position: fixed;
    float:left;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 17rem;
    height: 100vh;
  }
  #sideNav .navbar-brand {
    display: flex;
    margin: auto auto 0;
    padding: 0.5rem;
  }
  #sideNav .navbar-brand .img-profile {
    max-width: 6rem;
    max-height: 10rem;
    border: 0.1rem solid #3ac17e;
  }
  #sideNav .navbar-collapse {
    display: flex;
    align-items: flex-start;
    flex-grow: 0;
    width: 100%;
    margin-bottom: auto;
  }
  #sideNav .navbar-collapse .navbar-nav {
    flex-direction: column;
    width: 100%;
  }
  #sideNav .navbar-collapse .navbar-nav .nav-item {
    display: block;
  }
  #sideNav .navbar-collapse .navbar-nav .nav-item .nav-link {
    display: block;
  }
}

@media (min-width: 768px) {
  .send_cards_container {
    width: auto;
    height: auto;
    margin-left: 0rem;
    margin-top: 55px;
  }
  .body_cont {
    height: 100%;
    position: relative;
    display: block;
    margin-left: 0rem;
    /* min-height: 775px; */
  }
  .logout{
    position:relative;
  }
}


@media (min-width: 992px) {
  .body_cont {
    height: 100%;
    position: relative;
    display: block;
    margin-top: 0px !important;
    margin-left: 17rem !important;
    /* min-height: 775px; */
  }
}

.bg-primary {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

i {
  margin-left: 15px;
  margin-right: 25px;
}
.text-primary {
  color: #000 !important;
}
.js-scroll-trigger {
  color: #ffffff !important;
}
.profile-usertitle-name {
  color: #eeeeee;
}
.logout {
  /* position: relative;
  bottom:20px;
  text-align: left;
  color:#dcdcdc !important;
  font-size:0.9em;
  list-style: none;
  outline:none;
  text-decoration: none !important;
  margin-left:0;
  padding:0;
  display:block; */

}
.dot_indicator{
  background:red;
  border-radius: 3px;
  height:6px;
  width:6px;
  position: absolute;
  right:100px;
  margin-top:-13px;
}

</style>

