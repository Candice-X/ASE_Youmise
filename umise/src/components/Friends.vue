<template>
<div id='friends' >
    <!--- body -->
    <div id="my_cards" class="body_cont">
        <div class = "send_cards_container" >
            <h4 class="title" >Card Communication with </h4>
            <h4 class="subTitle">Card history with friends, the received card and card sent from each other </h4>

         <center>
        <button class="btn btn-primary btn-outline-success" 
        :class="{ active: isReceiveModel==='received' }" @click="showReceivedCard">Cards Received</button>
        <button class="btn btn-primary btn-outline-success" 
        :class="{ active: isReceiveModel ==='sent' }" @click="showSendCard" >Cards Sent</button>
        </center>
            <div class="row">
                <div class="empty_msg" style="" v-if="cards.length===0">
                You don't have any Card right now <br/>
                <router-link class="btn btn-secondary btn-primary" to="/dashboard"> 
                Send Card to Friends </router-link>
               </div>

                <div v-for = "(card, index) in cards" :key="index" class="col-lg-6 col-md-6 col-sm-12 card_cont" >
                    <div class="card_img" data-toggle="modal"
                    data-target="#friend_cards_specific" @click= "showCard(index)">
                        <img v-bind:src="card.cardImgURL" />
                        
                        <div class ="sender_cont" >
                            <div class ='avatar' >
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
        </div>
        <!-- alert message -->
    <div class="friend_alert" style="display:none;" >
      <p> Friend request send to {{this.email}} Successfully! </p>
    </div>
   <!-- end of alert -->
        <!-- alert message -->
    <div class="card_send_alert" style="display:none;" >
      <p> {{this.oneCard.cardTitle}} send to {{this.oneCard.sender}} Successfully! </p>
    </div>
   <!-- end of alert -->


    </div>
  <friends-list v-on:refreshFriendCards="showReceivedCard" ></friends-list>
<!-- Modal -->
  <div class="modal fade bd-example-modal" id="add_friends" tabindex="-2" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
    <div class="modal-dialog modal modal-dialog-centered" role="document" >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Add New Friend</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
          
             <!-- <div class="form-label-group" :class="{ invalid: $v.addfriends.email.$error }">
                <input  v-model="addfriends.email" id="inputEmailfriend" class="form-control" placeholder="Email address"
                @blur="$v.addfriends.email.$touch()">
                <label for="inputEmailfriend">Friends Email address</label>
            </div> -->
                 <label for="inputEmailfriend">Friends Email address</label>
                <input v-model="email" id="inputEmailfriend" class="form-control col-sm-12" 
                placeholder="Email address" @blur="$v.email.$touch()" style="margin-bottom:0px;" >  
                <p style="display:block;height:25px;color:red;">{{errorMsg}}</p>       
         
          <button class="btn btn-primary btn-success btn-send  col-sm-12" :disabled="$v.email.$invalid" 
          style="margin-bottom:20px;" @click="addFriends" >Add a New Friends</button>


        </div>

        </div>

      </div>
    </div> <!-- end of add new friend Modal -->


<!-- Modal -->
  <div class="modal fade bd-example-modal-lg" id="friend_cards_specific" tabindex="-1" role="dialog" 
  aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="background:rgba(1,1,1,0.6)">
    <div class="modal-dialog modal-dialog-centered" role="document" style="width:350px;padding:0;border:0;">
      <div class="modal-content" style="background:none;">
       
        <div class="modal-body" style="height:680px;">          
                <div class=" card_cont " >
                  
                    <div class="card_img card_img_more"  >
                        <img v-bind:src = "this.oneCard.cardImgURL" />
                         <div class ="sender_cont sender_cont_one "  >
                            <div class ='avatar one_avatar' >
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
                        <div  v-if="isReceiveModel==='received' && this.oneCard.status ===1" class="use_card " @click="useCard" >
                              <a > Use This Promise Card</a>
                        </div>
                        
                         <div  v-if="this.oneCard.status ===5" class="use_card " style="background:pink;">
                              <a> Promise Completed</a>
                        </div>
                         <div  v-if=" this.oneCard.status ===6 && this.$store.state.user.userID !== this.oneCard.receiverid" class="use_card " style="background:green;">
                              <a  > Promise Card in Using</a>
                              
                        </div>
                         <div  v-if="this.oneCard.status ===6 && this.$store.state.user.userID === this.oneCard.receiverid " class="use_card " @click="useCard">
                                 <a > Mark Promise Complete</a>
                        </div>
                        <div  v-if="this.oneCard.status ===4" class="use_card " style="background:red;">
                              <a> Promise Card Expired</a>
                        </div>
                        <div  v-if="isReceiveModel==='sent' && this.oneCard.status ===1" class="use_card " style="">
                              <a> Promise Card Sent to Friend</a>
                        </div>
                       </div>
                    <!-- end use card -->

                </div>
                <!-- <div class ="sender_cont_more col-lg-5 col-md-5 col-sm-5" > 
                        <img v-bind:src="this.oneCard.senderImg" />
                    <div class="content_more">
                        <h4>{{ this.oneCard.cardTitle }}</h4>
                          <p class="create_data">{{this.oneCard.createDate}}</p> 
                          <p> Status: {{this.oneCard.status}}</p> 
                        <p class="sub_title">From: {{ this.oneCard.senderName }}</p>
                        <div class="message_more">
                           {{this.oneCard.cardContent}} :)
                        </div>
                    </div>
                    <button class="btn btn-primary btn-success btn-send" >Use Card</button>
                </div> -->
           

        </div>

      </div>
    </div>
  </div>
  <!-- end of card one -->

  

  </div>

</template>

<script>
// import Nav from './DashboardNav';

import { required, email } from 'vuelidate/lib/validators';
import FriendsList from './FriendsList';
import axios from "axios";
import {mapActions} from "vuex";

export default {
  data() {
    return {
      email:'',
      isReceiveModel:'received',
      errorMsg:'',
      friendId:'',

      cards:[],
      //this is for create record
      oneCard: {
          recordid:'',
          senderid:null,
          senderName:'',
          receiverid:null,
          cardid:null,
          createDate:null,
          expireDate:null,
          finishDate:null,
          cardTitle:'',
          cardContent:'',
          status:null,
          cardImgURL: null,
          senderImg:this.$store.state.card.girl,
          receiverEmail:'',
          receiverName:'', 
      },  



    };
  },

  validations:{
    email:{         
        email,
        required,
      },
  },

  methods:{
    async addFriends() {
     try{
       if(this.$store.state.user.userID != null ){ 
          this.$store.state.user.loading = true;
        const response = await axios.post("/friend/sendFriendRequest",{"senderId":this.$store.state.user.userID, "receiverEmail":this.email});
        
         this.$store.state.user.loading = false;
        jQuery("#add_friends").modal('hide');
        this.showAlert();
       }else{
         throw new Error("You need to login first to add a friend");
       }

     }catch(e){
       console.log(e);
       this.errorMsg = e.message;
        this.$store.state.user.loading = false;
     };
    },

    async showReceivedCard() {
      this.isReceiveModel ='received';
      const userID =  this.$store.state.user.userID || localStorage.getItem("userID");
      const friendId = this.$store.state.user.currentFriendId;
      console.log("show received card:", userID);
     try{
       if(userID && friendId){
          this.$store.state.user.loading = true;
            const response = await axios.get(`/record/record/receiver/${userID}/friend/${friendId}`);
            // const response = await axios.get(`/record/record`);
            // this.cards = response.data;
            this.cards = response.data;
         
             this.$store.state.user.loading = false;
       }else{

       };
       
      }catch(e){
        console.log(e.message);
         this.$store.state.user.loading = false;
      };
    },

    async showSendCard() {
      this.isReceiveModel = 'sent';
       
       const userID =  this.$store.state.user.userID || localStorage.getItem("userID");
       const friendId = this.$store.state.user.currentFriendId;
       console.log("show send card friend id:", friendId);
     try{
       if(userID && friendId){
          this.$store.state.user.loading = true;
            const response = await axios.get(`/record/record/sender/${userID}/friend/${friendId}`);
            // this.cards = response.data;
              this.cards = response.data;
           
             this.$store.state.user.loading = false;
       }else{
        
       };
       
      }catch(e){
        this.errorMsg = e.message;
        console.log(e.message);
         this.$store.state.user.loading = false;

      };
 
    },

    ...mapActions(['']),
    // show card diagram
    async showCard(index) {   
      this.oneCard = this.cards[index];
    },

    async showAlert(){
         jQuery(".friend_alert").fadeIn();
      setTimeout(() => {
         jQuery(".friend_alert").fadeOut();
      },3500);
    },
    // send card 
    // record status:
    // 1: 有效的卡片，具有收卡人，发卡人，在有效期内，
    // 2：已发送但是没有接收人，
    // 3： 邀请卡类型，接收人为多人（不建议新增这个状态。。。）
    // 4： 过期卡
    // 5： 已使用
    // 6： 使用中，等待对方确认(这个多余了， 确认以后再update就好了
   async useCard(){
      const userID =  this.$store.state.user.userID || localStorage.getItem("userID");

      // let rec = this.onCard.recordid;
      console.log("record:",this.oneCard);
      // console.log("onecard",this.oneCard);
     
      // console.log(`/record/record/${recordid}`);
     try{
       if(userID){
         if(this.oneCard.status === 1){
          this.oneCard.status = 6;
         }else if(this.oneCard.status===6)
         {
           //mark as complete
           this.oneCard.status = 5;
         }else{
           return "status cannot change";
         }
            jQuery("#friend_cards_specific").modal('hide');

            
            this.oneCard["title"]=this.oneCard.receiverName + " want to use the " + this.oneCard.cardTitle;
            this.oneCard["msgContent"]=this.oneCard.receiverName + " want to use the " + this.oneCard.cardTitle+ " which you sent to him/her at "+ this.oneCard.createDate.tostring(0,10)+". Last time you said: "+ this.oneCard.cardContent;
            const response = await axios.patch(`/record/record/${this.oneCard.recordid}`,this.oneCard);

            jQuery(".card_send_alert").fadeIn();
            setTimeout(() => {
                jQuery(".card_send_alert").fadeOut();
            },3500);
          
       };
       
      }catch(e){
      
        console.log("usercard: ",e.message);
      }; 
    },

    

  },

  components: {
    // Nav,
    FriendsList,
  },
  created: function() {
    this.$store.state.isLogin = true;
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
}
.empty_msg{
  margin:auto;
  text-align:center;
  margin-top:10em;
  color:white;
  font-size:1rem;
}

.friend_alert{
  margin:auto;
   z-index:99;
  text-align:center;
  width:25rem; 
  background:#ffc9aa;
  border-radius:5px;
  height:5rem;
position:fixed;
top:0px;
left:0px;
bottom:0px;
right:0px;

}
.friend_alert p{
  padding:0;
  text-align:center;
  margin-top:1rem;
  padding-top:1em;
  line-height:2em;
  display:block;

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
#friends {
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
  min-height: 790px;
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
    padding-right:15rem !important;
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

.form-label-group.invalid input {
  border : 1px solid red;
  background: #ffc9aa;
}


.promise_msg{
  word-wrap: normal;
  width: 210px;
  height:110px;
  overflow: hidden;
  position: relative;
  color:#fff;
  font-size: 0.9em;
  margin:auto;
  top:-260px;
  text-align:left;
  line-height: 1.5em;
  
}
.use_card{
  display: block;
  z-index:999;
  /* opacity:0.8; */
  position: relative;
  width:330px;
  margin-top:-3px;
  border-radius: 0 0 5px 5px;
  color:#fff;
  height:60px;
  padding:5px;
  padding-top:15px;
  background:#3ac17e;
  cursor: pointer;
  font-size: 1.2em;
}
.user_card:hover{
  background:red;
}


.card_img_more {
  width: 330px;
  /* margin: 10px 25px; */
  background: #3ac17e;
  height: 500px;
  margin:0;
  border-radius: 5px;
  border: 2px dashed #fff;
  color:#fff;
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
.userName{
  color:#fff;
  font-size:0.8em;
  text-align:center;
}
.content_one {
  width: 240px;
  height: 80px;
  font-size: 0.8em;
  padding:5px;
  background:#dcdcdc;
  border-radius:5px;
  color:#222;
  margin-left: 8px;
  display: inline-block;
  word-wrap:normal;
  line-height: 1.5em;
  padding-top:5px;
  opacity: 1;
  margin-left:10px;
  overflow: hidden;
}
.message_more{
  background: #eeeeee;
  border-radius: 5px;
  
  display: block;
  text-align: left;
  padding:15px;
  margin:10px;
  height:100px;
  font-size:0.85em;
  overflow: hidden;
  margin-bottom: 20px;
}
.one_send_cont{
  margin-top:10px;
}
.one_avatar{
  float:left;
  margin-top:20px;
}

.sender_cont_one{
  position: relative;
  margin-top:-100px;
}
.time{

  float:right;
  height:20px;
  font-size:10px;
  margin-top:-18px;
  color:#555;
}
</style>
