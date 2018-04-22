<template>
  <div id='nav_dashboard'>
    <!--- body -->
    <div id="send_cards" class="body_cont">
      <div class="send_cards_container">
        <h4 class="title">Send Cards</h4>
        <h4 class="subTitle">Choose a Card and send to your friends, or you can design your own card.</h4> 
        <div class="row card_row">
          <div v-for="(card, index) in cardsType" :key="index" :id="card.cardid" 
          class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 card_cont card_cont_mobile">
            <div class="card_img" data-toggle="modal" data-target="#Dashboard_send" @click="showCard(index)">
              <img v-bind:src="card.cardImgURL" />
              <h4> {{card.cardName}}</h4>
              <!-- <h5 style="font-size:0.5rem;">{{card.createdAt}}</h5> -->
              <!-- <p class="sub_title">{{card.cardNote}}</p> -->
            </div>
          </div>
          <!-- <div class="col-md-3 col-md-4 col-sm-6 card_cont">
                      <div class="card_img customize-icon-cont" >
                          <div class="customize-icon">
                          <i class="icon-settings "></i>
                          </div>
                          <h4 style="color:#fff;">Customize Card</h4>
                          <p class="sub_title">Enjoy the Creations</p>
                      </div>
                  </div> -->
        </div>
      </div>
  
       <div> 
        <!-- alert message -->
        <div class="send_card_alert" style="display:none;">
          <p> Send Card to <strong style="color:green;font-weight:600;">{{this.oneCard.receiverEmail}} </strong> Successfully! </p>
        </div>
        <!-- end of alert -->
  
        <!-- Modal -->
        <div class="modal fade bd-example-modal-lg" id="Dashboard_send" tabindex="-1" role="dialog" 
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered modal_size_ipad" role="document">
            <div class="modal-content">
              <div class="modal-body" style="height:560px;">
                <div class="row">
  
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 card_cont card_cont_one">
                    <div class="card_img_more">
  
                      <img v-bind:src="this.oneCard.cardImgURL" />
                      <div class="sender_cont">
                        <div class='avatar'>
                          <img src="../assets/img/girl.png" />
                          <p class="userName">{{ this.$store.state.user.userName }}</p>
                        </div>
                        <div class="content">
                          <!-- <h7>{{ this.oneCard.cardName }}</h7> -->
                          <p class="msg">{{this.oneCard.message}}</p>
  
                        </div>
                      </div>
                      <div class="promise_msg">
                        <p>{{this.oneCard.cardNote}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="sender_cont_more col-lg-6 col-md-6 col-sm-12 col-xs-12">
  
                    <div class="content_more">
                      <center>
                        <h4>{{ this.oneCard.cardName }}</h4>
                      </center>
                    
                      <label>Friend </label>
                      <div class="input-group friend_list_cont">
                        <!-- <div class="friend_place_hoder">Choose A Friend</div> -->
                        <input type="text" v-model="oneCard.receiverName" @focus="showFriendList=true" @blur="showFriendList=false" 
                        @keyup="autoComplete" class="form-control" placeholder="Friend Name" aria-label="Username" aria-describedby="basic-addon1">
  
                      </div>
                      <!-- popup friend div -->
                      <div class="friend_float_div" v-if="showFriendList">
                        <div v-if="searchFriendList.length===0">
                          <p style="color:white;text-align:center;margin-top:100px;font-size:1em;">You do not have friend named: {{this.oneCard.receiverName}} </p>
                        </div>
                        <div v-if="searchFriendList.length!==0" v-for="(friend, index) in searchFriendList" :key="index" 
                        class="friend" @mousedown="chooseFriend(index)">
                          <div class="friends_img">
                            <img src="../assets/img/girl.png" />
                          </div>
                          <div class="friens_info">
                            <span>{{friend.username}} </span>
                            <div class="card_info">
                              <p>{{friend.email}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end of pop up friend div  -->
                      <br/>
                      <label>Expire Date</label>
                      <div class="form-group">
                        <select class="form-control" id="exampleFormControlSelect1">
                                <option value='Forever' checked >Never</option>
                                <option value="1" >1 Day</option>
                                <option>1 Week</option>
                                <option>1 Month</option>
                                <option>1 Year</option>
                              </select>
                      </div>
                      <label>Message</label>
                      <textarea v-model="oneCard.message" class="form-control message_more" maxlength="140" 
                      placeholder="Please input your message send to your friends">
                      How you have a great weekend, I will treat you a great dinner Next time :)
                      </textarea>
                    </div>
                    <p style="color:red;margin:-13px;padding:0;"> {{this.errMsg}}</p>
                    <br/>
                    <button class="btn btn-primary btn-success btn-send" @click="sendCard" :disabled="$v.oneCard.receiverName.$invalid">Send to Friends</button>
  
                    <button class="btn btn-primary btn-outline-secondary btn-send btn-cancle" @click="cancle">Cancle</button>
                  </div>
                </div>
  
              </div>
  
            </div>
          </div>
        </div>
        <!-- end of card one -->
    </div>
  
  </div>
  
  </div>
</template>

<script>
  // import Nav from './DashboardNav';
  import { required, email } from "vuelidate/lib/validators";
  import Friends from './Friends';
  import { mapState, mapActions, mapGetters } from "vuex";
  import axios from "axios";
    
  export default {
    data() {
      return {
        // name: 'kuer',
        cardsType: [],
        errMsg: '',
        friendsList: [],
  
        // used to send card to others
        showFriendList: false,
        oneCard: {
          cardid: null,
          cardName: '',
          cardImgURL: null,
          cardNote: '',
          sender: null,
          senderImg: this.$store.state.card.girl,
          receiverEmail: '',
          // expire:'Forever',
          message: '',
          receiverName: '',
        },
        searchFriendList: [],
  
        sendCardRecord: {
          senderid: '',
          receiverid: '',
          cardid: '',
          expireDate: null,
          finishDate: null,
          cardContent: '',
          cardTitle: '',
          receiverEmail: '',
        },
  
      };
    },

    validations: {
      oneCard: {
        receiverName: {
          required,
        },
      },
    },
  
    components: {
      Friends,  
    },
  
    methods: {
      showCard(index) {
        this.oneCard = this.cardsType[index];
      },
  
      shareToFacebook() {
        FB.ui({
          method: 'share',
          href: 'https://umise.me',
          picture: 'https://s3.us-east-2.amazonaws.com/umisefrontendimages/Chance_Card.jpg',
          title: 'This is my page',
          description: "Hello, this is just a test",
          caption: "picture caption"
        }, function(response) {
          console.log("feed:", response);
        });
      },
  
      chooseFriend(index) {
        console.log(index);
        this.oneCard.receiverName = this.searchFriendList[index].username;
        this.oneCard.receiverEmail = this.searchFriendList[index].email;
        this.showFriendList = false;
        console.log(this.oneCard.receiverName);
      },
  
      //friendList
      autoComplete() {
        let re = this.oneCard.receiverName.toUpperCase();
        let n = this.friendsList.length;
        if (re.length === 0) {
          this.searchFriendList = this.friendsList;
          return;
        }
        if (re.length > 0 && n > 0) {
          this.searchFriendList = [];
          // let reg = new RegExp('.*'+re+'.*');
          let reg = new RegExp(re);
  
          for (let i = 0; i < n; i++) {
            let temp = reg.exec(this.friendsList[i].username.toUpperCase());
            if (temp !== null) {
              this.searchFriendList.push(this.friendsList[i]);
            }
            //  let temp =  this.friendsList[i].username.toUpperCase().exec(reg);
            // let temp = reg.exec(this.friendsList[i].username.toUpperCase());
            console.log("test:", temp);
          };
        };
  
      },
  
      //send card to friends
      async sendCard() {
        try {
          this.errMsg = '';
          const userID = this.$store.state.user.userID || localStorage.getItem("userID");
  
          console.log("userid :", userID);
          if (userID) {
            this.sendCardRecord.senderid = userID;
            this.sendCardRecord.receiverEmail = this.oneCard.receiverEmail;
            this.sendCardRecord.cardid = this.oneCard.cardid;
            this.sendCardRecord.expireDate = null;
            this.sendCardRecord.cardContent = this.oneCard.message;
            this.sendCardRecord.cardTitle = this.oneCard.cardName;
            this.sendCardRecord.receiverid = null;
  
            this.sendCardRecord["title"] = this.sendCardRecord.receiverEmail + " send card" + this.oneCard.cardName;
            this.sendCardRecord["msgContent"] = this.oneCard.sender + " send a card { " + this.oneCard.cardName + " } to " + this.oneCard.receiverEmail + " at " + new Date() + ".";
  
            // console.log("send record object :", this.sendCardRecord);
            this.$store.state.user.loading = true;
            const resp = await axios.post('/record/record', this.sendCardRecord);
  
            this.$store.state.user.loading = false;
            jQuery("#Dashboard_send").modal('hide');
            this.showAlert();
          } else {
            throw new Error("Please login in first");
          };
        } catch (e) {
          this.errMsg = e.response.data;
          console.log(e);
          console.log(e.response.data);
          this.$store.state.user.loading = false;
        };
  
      },
  
      cancle() {
        jQuery("#Dashboard_send").modal('hide');
      },
  
      async getFriendsList() {
        try {
          const userID = this.$store.state.user.userID || localStorage.getItem("userID");
          if (userID) {
            this.$store.state.user.loading = true;
            const response = await axios.get(`/friend//listFriends/${userID}`);
            console.log(response.data);
            this.searchFriendList = response.data;
            this.$store.state.user.friendList = response.data;
            this.friendsList = this.$store.state.user.friendList;
  
            // console.log("friendsList :", this.friendsList);
            this.$store.state.user.loading = false;
          } else {
  
          };
        } catch (e) {
          console.log(e.response.data);
          this.$store.state.user.loading = false;
        };
      },
  
      async showAlert() {
        jQuery(".send_card_alert").fadeIn();
        setTimeout(() => {
          jQuery(".send_card_alert").fadeOut();
        }, 3500);
  
      },
  
    },
  
    created: function() {
      this.$store.state.user.isLogin = true;
      // this.cardsType = this.$store.getters.getAllCardTypeFromState;
      // console.log("cards type:",cardsType);
    },
  
    mounted() {
      try {
        this.$store.state.user.loading = true;
        axios.get("/card/card")
          .then(res => {
            console.log("get all cards types", res.data);
            // this.setAllCardType(res.data);
            this.$store.state.card.sendCardTypes = res.data;
            this.cardsType = this.$store.state.card.sendCardTypes;
            this.$store.state.user.loading = false;
  
          })
          .catch(error => {
            console.log(error);
          });
      } catch (e) {
        console.log(e.response.data);
        this.$store.state.user.loading = false;
      };
      this.getFriendsList();
  
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
  
  .card_cont {
    /* background:#dcdcdc; */
    display: block;
    width: 220px;
    ;
    padding: 0;
    margin: 0px;
    margin-top: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    float: left;
  }
  
  .row {
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
  
  .promise_msg {
    word-wrap: normal;
    width: 210px;
    height: 110px;
    overflow: hidden;
    z-index: 999;
    position: relative;
    color: #fff;
    font-size: 0.9em;
    margin: auto;
    top: -250px;
    text-align: left;
    line-height: 1.5em;
  }
  
  .promise_msg p {
    font-size: 1em;
  }
  
  .card_img:hover {
    background: #3ac17e;
    opacity: 0.9;
    cursor: pointer;
    border: 2px dashed #fff;
    color: #fff;
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
    height: 280px;
  }
  
  .card_img_more img {
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 495px;
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
    background: url(/img/bg1.2bf8b4c8.jpg) no-repeat center center fixed;
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
  
  .btn-cancle {
    margin-top: 30px;
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
  
  @media (min-width: 768px) and (max-width: 992px) {
    .modal_size_ipad {
      max-width: 95%;
    }
  }
  
  @media (min-width: 992px) {
    .body_cont {
      /* width:90%; */
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
    display: table-cell;
    /* min-height: 775px;  */
  }
  
  .modal-dialog-centered {
    overflow: hidden;
  }
  
  .sender_cont_more img {
    width: 90px;
    margin-top: 25px;
  }
  
  .content_more {
    margin-top: 15px;
  }
  
  .sender_cont {
    width: 100%;
    text-align: left;
    margin-top: -90px;
    padding: 0;
    position: relative;
  }
  
  .avatar {
    position: relative;
    top: 0px;
    /* top: -10px; */
    display: inline-block;
    width: 40px;
    height: 40px;
    padding: 0;
    margin-left: 10px;
    float: left;
  }
  
  .avatar img {
    width: 40px;
    height: 40px !important;
    border-radius: 50% !important;
  }
  
  .content {
    width: 240px;
    height: 80px;
    font-size: 13px;
    padding: 5px;
    background: #dcdcdc;
    border-radius: 5px;
    color: #222;
    margin-left: 8px;
    display: inline-block;
    word-wrap: normal;
    line-height: 1.5em;
    padding-top: 5px;
    opacity: 0.7;
    margin-left: 10px;
    overflow: hidden;
  }
  
  .message_more {
    background: #eeeeee;
    border-radius: 5px;
    margin: 0px;
    display: block;
    text-align: left;
    padding: 15px;
    height: 100px;
    font-size: 0.85em;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .btn-send {
    width: 100%;
  }
  
  .card_row {
    width: 100%;
  }
  
  .userName {
    color: #fff;
    font-size: 0.8em;
    text-align: center;
  }
  
  .content_more label {
    text-align: left;
    padding: 5px;
    margin-left: 0px;
  }
  
  .content_more {
    text-align: left;
  }
  
  .friend_list_cont {
    width: 100%;
    max-height: 400px;
    display: blcok;
    margin: 0;
    padding: 0;
  }
  
  
  /* .friends {
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    height: 100%;
    width: 240px;
    color:#fff;
    padding-top:10px;
  } */
  
  .friend {
    width: 100%;
    float: left;
    /* float:left; */
    margin: 0;
    padding: 10px;
    height: 55px;
    cursor: pointer;
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  }
  
  .friend_float_div {
    position: absolute;
    float: left;
    height: auto;
    height: 265px;
    overflow: scroll;
    width: 343px;
    /* padding:0; */
    /* top:-2px; */
    margin-top: 0px;
    background: rgba(0, 0, 0, 0.9);
    /* border-radius:0 0 5px 5px; */
  }
  
  .friend_float_div::-webkit-scrollbar-thumb {
    background: #888;
  }
  
  .friends_img {
    width: 50px;
    height: 50px;
    display: block;
    position: relative;
    top: 0;
    margin: 0px;
    padding: 0;
    float: left;
    margin-left: 8px;
  }
  
  .card_info {
    font-size: 0.7rem;
    color: #dcdcdc;
    cursor: pointer;
  }
  
  .card_info span {
    margin: 0;
    padding: 0;
    margin-left: 5px;
    padding-right: 15px;
    font-weight: 800;
  }
  
  .friends_img img {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
  
  .friens_info {
    display: block;
    float: left;
    height: 100%;
    width: 165px;
    color: white;
    text-align: left;
  }
  
  .friend:hover {
    background: #444444;
  }
  
  .msg {
    font-size: 1em;
  }
  
  @media (max-width:768px) {
    #nav_dashboard {
      padding-top: 40px;
    }
    .sender_cont_more {
      float: left;
      position: absolute;
      top: 520px;
      margin: 0 auto;
      width: 325px;
    }
    .modal-content {
      margin: 0;
      padding: 0;
      margin-top: 50px;
      height: 1090px;
    }
    .modal-body {
      height: 100% !important;
    }
    .card_img_more {
      margin: auto;
    }
  }
</style>
