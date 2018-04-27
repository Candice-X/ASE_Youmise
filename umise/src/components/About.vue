<template>
  <div id='mycards'>
    <!--- body -->
    <div id="my_cards" class="body_cont">
      <div class="send_cards_container">
        <!-- <h4 class="title" >My Cards</h4>-->
        <h2 class="title"> We are Cat Named Doggie</h2>
        <div class="row">
          <div v-for="(card, index) in cards" :key="index" class="col-lg-3 col-md-3 col-sm-6 col-xs-12 card_cont card_cont_mobile">
            <div class="card_img">
              <img v-bind:src="card.cardImg" />
              <div class="sender_cont">
                <div class='avatar'>
                  <img v-bind:src="card.senderImg" />
                </div>
                <div class="content">
                  <h4>{{ card.cardName }}</h4>
                  <p class="sub_title">{{ card.sender }}</p>
                </div>
  
              </div>
  
            </div>
          </div>
  
  
        </div>
      </div>
  
    </div>
  
  </div>
</template>

<script>
  // import Nav from './DashboardNav';
  const img1 = require("../../static/card/1.jpg");
  const img7 = require("../../static/card/7.png");
  const img8 = require("../../static/card/8.png");
  const img13 = require("../../static/card/card1.png");
  
  const girl = require("../../static/girl.png");
  const boy = require("../../static/Logo.png");
  
  export default {
    data() {
      return {
        cards: [{
            cardName: "Fujunku Chen",
            cardImg: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/fujunku.jpg",
            sender: "Enjoy the show",
            senderImg: boy
          },
          {
            cardName: "Yinghai Xu",
            cardImg: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/yinghai.jpeg",
            sender: "Just like it",
            senderImg: girl
          },
          {
            cardName: "Yingying Huang",
            cardImg: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/yingying.jpg",
            sender: "Milk tea is my life",
            senderImg: girl
          },
          {
            cardName: "Shanshan Zhang",
            cardImg: img8,
            sender: "We make friend closer",
            senderImg: girl
          }
        ]
      };
    },
    components: {
      // Nav,
    },
  };
</script>

<style scoped>
  @import "../assets/css/font-awesome.min.css";
  @import "../assets/css/simple-line-icons.css";
  .send_cards_container button {
    color: #ffffff;
    margin-left: 15px;
  }
  
  .sender_cont {
    width: 100%;
    text-align: left;
    margin-top: 0;
    padding: 0;
  }
  
  .avatar {
    position: relative;
    top: -10px;
    display: inline-block;
    width: 40px;
    height: 40px;
    padding: 0;
    margin-left: 10px;
  }
  
  .avatar img {
    width: 40px;
    height: 40px !important;
    border-radius: 50% !important;
  }
  
  .content {
    width: 150px;
    margin-left: 8px;
    display: inline-block;
    line-height: 1em;
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
  
  #mycards {
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
    background: #f0f3f6;
    background: url("../assets/img/bg1.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
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
  
  h1 {
    font-size: 6rem;
    line-height: 5.5rem;
  }
  
  h2 {
    font-size: 3.5rem;
  }
  
  .card_img h4 {
    margin-top: 8px;
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
  
  section.resume-section {
    border-bottom: 1px solid #dee2e6;
    padding-top: 5rem !important;
    padding-bottom: 5rem !important;
  }
  
  section.resume-section .resume-item .resume-date {
    min-width: none;
  }
  
  @media (min-width: 768px) {
    section.resume-section {
      min-height: 100vh;
    }
    section.resume-section .resume-item .resume-date {
      min-width: 18rem;
    }
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
    section.resume-section {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
    }
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
  
  @media (max-width:768px) {
    #mycards {
      padding-top: 40px;
    }
  }
</style>
