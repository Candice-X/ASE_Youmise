<template>
<div id='nav_dashboard' >
    <!--- body -->
    <div id="send_cards" class="body_cont">
        <div class = "send_cards_container" >
            <h4 class="title" >Send Cards</h4>
            <h4 class="subTitle">Choose a Card and send to your friends, or you can design your own card.</h4>
            <div class="row">
                <div  v-for = "(card, index) in cards" :key="index" class="col-lg-3 col-md-3 col-sm-6 card_cont">
                    <div class="card_img" >
                        <img :src="card.cardImg" />
                        <h4>{{card.cardName}}</h4>
                        <p class="sub_title">{{card.cardInfo}}</p>
                    </div>
                </div>          

                 <div class="col-md-3 col-md-3 col-sm-6 card_cont">
                    <div class="card_img customize-icon-cont" >
                        <div class="customize-icon">
                        <i class="icon-settings "></i>
                        </div>
                        <h4 style="color:#fff;">Customize Card</h4>
                        <p class="sub_title">Enjoy the Creations</p>
                    </div>
                </div>

            </div>
        </div>
        <!-- <Friends></Friends> -->
    </div>

</div>
</template>

<script>
// import Nav from './DashboardNav';
import Friends from './Friends';

export default {
  data() {
    return {
      name: 'kuer',
      cards: [
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/12.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/card1.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/card2.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/1.jpg',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/2.jpg',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/3.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/4.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/5.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/6.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/7.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/8.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/9.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/10.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        {
          cardName: 'Dinning Card',
          cardImg: '../../static/card/11.png',
          cardInfo: 'From Kuer and Enjoy',
          senderImg: '../../static/girl.png',
        },
        


      ],
    };
  },
  components: {
    Friends,
  },
  created: function() {
    this.$store.state.user.isLogin = true;
  },
};
</script>

<style scoped>
@import '../assets/css/font-awesome.min.css';
@import '../assets/css/simple-line-icons.css';

body {
  font-family: "Open Sans", serif;
  padding-top: 54px;
  color: #868e96;
}

.card_cont {
  /* background:#dcdcdc; */
  display: block;
  width: auto;
  padding: 0;
  margin: 0px;
  margin-top: 15px;
  margin-bottom: 50px;
  border-radius: 5px;
}
.row {
  width: auto;
  padding: 0;
  margin: 0;
  margin-left: 20px;
  padding-bottom: 50px;
  margin-bottom: 200px;
}
.card_img {
  width: 220px;
  margin: 10px 25px;
  background: #dcdcdc;
  height: 320px;
  border-radius: 5px;
}
.card_img:hover {
  background: #3ac17e;
  opacity: 0.9;
  cursor: pointer;
  border: 2px dashed #fff;
  color: #fff;
}
.customize-icon-cont {
  border: 4px dashed #fff;
  width: 220px;
  margin: 10px 25px;
  background: rgba(0, 0, 0, 0.2);
  height: 320px;
  border-radius: 5px;
  color: #fff;
  color: #fff;
}
.customize-icon-cont i {
  font-size: 6em;
  text-align: center;
  position: relative;
  top: 80px;
}
.customize-icon {
  opacity: 0.8;
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 180px;
}
.card_cont img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 260px;
}
.send_cards_container {
  height: auto;
  margin-top: 50px;
  margin-left: 0rem;
}
.title {
  text-align: left;
  font-size: 1.8em;
  color: #fff;
  margin-left: 50px;
}
.subTitle {
  color: #ddd;
  font-size: 0.9em;
  margin-left: 50px;
  text-align: left;
}
#nav_dashboard {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  background: #fff;
  background: url(/static/img/bg1.2bf8b4c.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 786px;
  overflow-x: hidden;
}

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
  font-family: "Saira Extra Condensed", serif;
  font-weight: 700;
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
  font-family: "Saira Extra Condensed", serif;
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

#sideNav .navbar-nav .nav-item .nav-link {
  font-weight: 600;
  text-transform: uppercase;
}

@media (min-width: 992px) {
  #sideNav {
    text-align: center;
    position: fixed;
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

.body_cont {
  height: 100%;
  width: auto;
  position: relative;
  display: block;
  float: left;
  /* min-height: 775px;  */
}
</style>
