<template>
  <div id='mycards'>
    <!--- body -->
    <div id="my_cards" class="body_cont">
      <div class="send_cards_container">
        <div class="form-inline">
  
          <input class="form-control form-control-sm search_bar " type="text" placeholder="Search" v-model="search" @keyup="searchCard" @focus="setDefault" aria-label="Search">
        </div>
  
        <center>
          <button class="btn btn-primary btn-outline-success" :class="{ active: isReceiveModel==='received' }" @click="showReceivedCard">Received</button>
          <button class="btn btn-primary btn-outline-success" :class="{ active: isReceiveModel ==='sent' }" @click="showSendCard">Sent</button>
          <button class="btn btn-primary btn-outline-success" :class="{ active: isReceiveModel==='request' }" @click="showRequest">In Use</button>
        </center>
  
        <div class="row">
          <!-- if empty -->
          <div class="empty_msg" style="" v-if="cards.length===0">
            You don't have any Card right now
            <router-link class="btn btn-secondary btn-primary" to="/dashboard"> Send Card to Friends </router-link>
          </div>
          <div v-for="(card, index) in cards" :key="index" class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 card_cont card_cont_mobile">
            <div class="card_img" data-toggle="modal" data-target="#Dashboard_send" @click="showCard(index)">
              <img v-bind:src="card.cardImgURL" />
              <!-- <div class="stamp" ><img src="https://s3.us-east-2.amazonaws.com/umisefrontendimages/stamp.png" /></div> -->
              <div class="sender_cont ">
                <div class='avatar'>
                  <img src="../assets/img/girl.png" />
                </div>
                <div class="content">
                  <h4>{{ card.cardTitle }}</h4>
                  <p class="sub_title">{{ card.senderName }}</p>
                  <span class="time">{{card.createDate.substring(0,10)}}</span>
                </div>
  
              </div>
  
            </div>
          </div>
  
  
        </div>
        <!-- end of row -->
      </div>
  
      <!-- alert message -->
      <div class="send_card_alert" style="display:none;">
        <p class="alert_info"> Send use card request to <strong style="color:green;font-weight:600;">{{this.oneCard.receiverEmail}} </strong> Successfully! </p>
      </div>
      <!-- end of alert -->
  
      <!-- Modal -->
      <div class="modal fade bd-example-modal-lg" id="Dashboard_send" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="background:rgba(1,1,1,0.6)">
        <div class="modal-dialog modal-dialog-centered" role="document" style="width:350px;padding:0;border:0;margin:auto">
          <div class="modal-content" style="background:none;">
  
            <div class="modal-body" style="height:557px;">
              <div class=" card_cont ">
  
                <div class="card_img card_img_more">
                  <img v-bind:src="this.oneCard.cardImgURL" />
                  <div class="sender_cont sender_cont_one ">
                    <div class='avatar one_avatar'>
                      <img src="../assets/img/girl.png" />
                      <p class="userName">{{ this.oneCard.senderName }}</p>
                    </div>
                    <div class="content_one one_send_cont">
                      <!-- <h4>{{ this.oneCard.cardTitle }}</h4>
                                    <p class="sub_title">{{ this.oneCard.senderName}}</p> -->
                      <p>{{this.oneCard.cardContent}}</p>
  
                    </div>
  
                  </div>
                  <div class="promise_msg">
                    <p>{{this.oneCard.cardNote}}</p>
                  </div>
                </div>
                <!-- use card -->
                <div>
                  <div v-if="isReceiveModel==='received' && this.oneCard.status ===1" class="use_card " @click="useCard">
                    <a> Use This Promise Card</a>
                  </div>
  
                  <div v-if="this.oneCard.status ===5" class="use_card " style="background:pink;">
                    <a> Promise Completed</a>
                  </div>
                  <div v-if=" this.oneCard.status ===6 && this.$store.state.user.userID !== this.oneCard.receiverid" class="use_card " style="background:green;">
                    <a> Promise Card in Using</a>
  
                  </div>
                  <div v-if="this.oneCard.status ===6 && this.$store.state.user.userID === this.oneCard.receiverid " class="use_card " @click="useCard">
                    <a> Mark Promise Complete</a>
                  </div>
                  <div v-if="this.oneCard.status ===4" class="use_card " style="background:red;">
                    <a> Promise Card Expired</a>
                  </div>
                  <div v-if="isReceiveModel==='sent' && this.oneCard.status ===1" class="use_card " style="">
                    <a> Promise Card Sent to Friend</a>
                  </div>
                </div>
                <!-- end use card -->
              </div>
  
            </div>
  
          </div>
        </div>
      </div>
      <!-- end of card one -->
    </div>
  
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import axios from "axios";
  import { required, email } from "vuelidate/lib/validators";
  
  export default {
    data() {
      return {
        isReceiveModel: 'received',
        search: '',
        cards: [],
        tempCards: [],
        requests: [],
        loading: 'true',
  
        //this is for create record
        oneCard: {
          senderImg: this.$store.state.card.girl,
        },
  
        cardsReceive: [],
        cardsSend: [],
      };
    },
    methods: {
      ...mapActions(['']),
      async showCard(index) {
        this.oneCard = this.cards[index];
      },
  
      setDefault() {},
  
      // search card from all cards 
      searchCard() {
        let re = this.search.toUpperCase();
        let n = this.tempCards.length;
  
        if (re.length === 0) {
          this.cards = this.tempCards; // tempCard is used to store the temp cards info
          return;
        }
        if (re.length > 0 && n > 0) {
          this.cards = [];
          let reg = new RegExp(re);
  
          for (let i = 0; i < n; i++) {
            let temp = reg.exec(this.tempCards[i].cardTitle.toUpperCase()) || reg.exec(this.tempCards[i].senderName.toUpperCase());
            if (temp !== null) {
              this.cards.push(this.tempCards[i]);
            }
          };
        };
  
      },
  
      async showReceivedCard() {
        this.isReceiveModel = 'received';
        const userID = this.$store.state.user.userID || localStorage.getItem("userID");
        console.log("show received card:", userID);
        try {
          if (userID) {
            this.$store.state.user.loading = true;
            const response = await axios.get(`/record/record/receiver/${userID}`);
            this.cards = response.data;
            this.tempCards = response.data;
            // console.log(response.data);
            this.$store.state.user.loading = false;
          } else {
  
          };
  
        } catch (e) {
          console.log(e.response.data);
          this.$store.state.user.loading = false;
        };
      },
  
      async showSendCard() {
        this.isReceiveModel = 'sent';
  
        const userID = this.$store.state.user.userID || localStorage.getItem("userID");
        console.log("show send card:", userID);
        try {
          if (userID) {
            this.$store.state.user.loading = true;
            const response = await axios.get(`/record/record/sender/${userID}`);
            // this.cards = response.data;
            this.cards = response.data;
            this.tempCards = response.data;
            // console.log(response.data);
            this.$store.state.user.loading = false;
          } else {
  
          };
  
        } catch (e) {
          console.log(e.response.data);
          this.$store.state.user.loading = false;
        };
      },
  
      // card in use
      async showRequest() {
        this.isReceiveModel = 'request';
  
        const userID = this.$store.state.user.userID || localStorage.getItem("userID");
        try {
          if (userID) {
            this.$store.state.user.loading = true;
            const response = await axios.get(`/record/record/receiver/${userID}/6`);
  
            const response2 = await axios.get(`/record/record/sender/${userID}/6`);
  
            const res = response.data.concat(response2.data);
            this.cards = res;
            // console.log(response.data);
            this.$store.state.user.loading = false;
          } else {
  
          };
  
        } catch (e) {
          console.log(e.response.data);
          this.$store.state.user.loading = false;
        };
      },
  
      // send card 
      // record status:
      // 1: 有效的卡片，具有收卡人，发卡人，在有效期内，
      // 2：已发送但是没有接收人，
      // 3： 邀请卡类型，接收人为多人（不建议新增这个状态。。。）
      // 4： 过期卡
      // 5： 已使用
      // 6： 使用中，等待对方确认(这个多余了， 确认以后再update就好了
      async useCard() {
        const userID = this.$store.state.user.userID || localStorage.getItem("userID");
  
        // let rec = this.onCard.recordid;
        console.log("record:", this.oneCard);
        try {
          if (userID) {
            if (this.oneCard.status === 1) {
              this.oneCard.status = 6;
            } else if (this.oneCard.status === 6) {
              //mark as complete
              this.oneCard.status = 5;
            } else {
              return "status cannot change";
            }
            jQuery("#Dashboard_send").modal('hide');
  
  
            // this.oneCard["title"] = this.oneCard.receiverName + " want to use the " + this.oneCard.cardTitle;
            // this.oneCard["msgContent"] = this.oneCard.receiverName + " want to use the " + this.oneCard.cardTitle + " which you sent to him/her at " + this.oneCard.createDate + ". Last time you said: " + this.oneCard.cardContent;
            const response = await axios.patch(`/record/record/${this.oneCard.recordid}`, this.oneCard);
  
            //show the alert messager
            jQuery(".send_card_alert").fadeIn();
            setTimeout(() => {
              jQuery(".send_card_alert").fadeOut();
            }, 3500);
  
          } else {
  
          };
  
        } catch (e) {
  
          console.log("usercard: ", e.response.data);
        };
      },
  
  
  
    },
    components: {
      // Nav,
    },
    created: function() {
      this.$store.state.isLogin = true;
      this.showReceivedCard();
    },
  
  };
</script>

<style scoped>
  @import "../assets/css/font-awesome.min.css";
  @import "../assets/css/simple-line-icons.css";
  body {
    font-family: "Open Sans", serif;
    padding-top: 54px;
    color: #868e96;
    width: 100%;
    height: 100vh;
    min-height: 775px;
    padding-top: 0;
    padding-bottom: 0;
  }
  
  .empty_msg {
    margin: auto;
    text-align: center;
    margin-top: 10em;
    color: white;
    font-size: 1rem;
  }
  
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
  
  .sender_cont_one {
    position: relative;
    margin-top: -100px;
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
    margin-bottom: 10px;
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
    /* opacity: 1; */
    cursor: pointer;
    border: 2px dashed #fff;
    color: #fff;
  }
  
  .card_img_more {
    /* width: 220px; */
    /* margin: 10px 25px; */
    background: #3ac17e;
    /* height: 320px; */
    margin: 0;
    border-radius: 5px;
    border: 2px dashed #fff;
    color: #fff;
  }
  
  .card_img_more:hover {
    /* background: #3ac17e; */
    /* opacity: 0.9; */
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
    /* opacity: 0.8; */
    opacity: 1;
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
    /* min-height: 786px; */
    overflow-x: hidden;
  }
  
  @media (min-width: 992px) {
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
      padding-left: 17rem !important;
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
    width: 100%;
    position: relative;
    display: block;
    float: left;
    /* min-height: 775px;  */
  }
  
  .sender_cont_more img {
    width: 90px;
    margin-top: 25px;
  }
  
  .content_more {
    margin-top: 15px;
  }
  
  .message_more {
    background: #eeeeee;
    border-radius: 5px;
    margin: 10px;
    display: block;
    text-align: left;
    padding: 15px;
    height: 90px;
    font-size: 0.9em;
  }
  
  .btn-send {
    width: 100%;
  }
  
  .create_data {
    font-size: 0.8em;
    color: #bbb;
  }
  
  .card_img_more {
    width: 330px;
    /* margin: 10px 25px; */
    background: #3ac17e;
    height: 500px;
    border-radius: 5px;
    border: 2px dashed #fff;
    color: #fff;
  }
  
  .card_img_more:hover {
    /* background: #3ac17e; */
    /* opacity: 1; */
    cursor: pointer;
    border: 2px dashed #fff;
    color: #fff;
  }
  
  
  /* .card_img_more:hover + .use_card{
      display:block;
      background:red;
    } */
  
  .card_img_more img {
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 500px;
  }
  
  .userName {
    color: #fff;
    font-size: 0.8em;
    text-align: center;
  }
  
  .content_one {
    width: 240px;
    height: 80px;
    font-size: 0.8em;
    padding: 5px;
    background: #dcdcdc;
    border-radius: 5px;
    color: #222;
    margin-left: 8px;
    display: inline-block;
    word-wrap: normal;
    line-height: 1.5em;
    padding-top: 5px;
    opacity: 1;
    margin-left: 10px;
    overflow: hidden;
  }
  
  .message_more {
    background: #eeeeee;
    border-radius: 5px;
    display: block;
    text-align: left;
    padding: 15px;
    margin: 10px;
    height: 100px;
    font-size: 0.85em;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .one_send_cont {
    margin-top: 10px;
  }
  
  .one_avatar {
    float: left;
    margin-top: 20px;
  }
  
  .promise_msg {
    word-wrap: normal;
    width: 210px;
    height: 110px;
    overflow: hidden;
    position: relative;
    color: #fff;
    font-size: 0.9em;
    margin: auto;
    top: -260px;
    text-align: left;
    line-height: 1.5em;
  }
  
  .use_card {
    display: block;
    z-index: 999;
    /* opacity:0.8; */
    position: relative;
    width: 330px;
    margin-top: -3px;
    border-radius: 0 0 5px 5px;
    color: #fff;
    height: 60px;
    padding: 5px;
    padding-top: 15px;
    background: #3ac17e;
    cursor: pointer;
    font-size: 1.2em;
  }
  
  .user_card:hover {
    background: red;
  }
  
  .send_card_alert {
    margin: auto;
    z-index: 99;
    text-align: center;
    width: 25rem;
    background: #ffc9aa;
    border-radius: 5px;
    height: 5rem;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }
  
  .send_card_alert p {
    padding: 0;
    text-align: center;
    margin-top: 1rem;
    padding-top: 1em;
    line-height: 2em;
    display: block;
  }
  
  .time {
    float: right;
    height: 20px;
    font-size: 10px;
    margin-top: -22px;
    color: #555;
  }
  
  .search_bar {
    float: right;
    width: auto;
    position: absolute;
    right: 40px;
    top: 60px;
  }
  
  .stamp {
    position: absolute;
    width: 60px;
    right: 30px;
    bottom: 40px;
    height: 60px;
  }
  
  .stamp img {
    width: 60px;
    height: 60px;
  }
  
  @media (max-width:768px) {
    .search_bar {
      float: none !important;
      width: 100%;
      position: relative;
      display: block;
      top: 0;
      right: 0;
      margin: 15px;
      margin-top: -15px;
      padding: 10px;
    }
    #mycards {
      margin-top: 55px;
    }
  }
</style>
