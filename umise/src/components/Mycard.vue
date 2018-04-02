<template>
<div id='mycards' >
    <!--- body -->
    <div id="my_cards" class="body_cont">
        <div class = "send_cards_container" >
            <!-- <h4 class="title" >My Cards</h4>
            <h4 class="subTitle">Card with  </h4> -->
      <center>
        <button class="btn btn-primary btn-outline-success" 
        :class="{ active: isReceiveModel }" @click="showReceivedCard">My Cards</button>
        <button class="btn btn-primary btn-outline-success" 
        :class="{ active: !isReceiveModel }" @click="showSendCard" >Cards Sent</button>
        </center>
            <div class="row">
                <div v-for = "(card, index) in cards" :key="index" 
                class="col-lg-3 col-md-3 col-sm-6 card_cont" >
                   <div class="card_img" data-toggle="modal"
                    data-target="#Dashboard_send" @click= "showCard(index)">
                        <img v-bind:src="card.cardImgURL" />
                        
                        <div class ="sender_cont" >
                            <div class ='avatar' >
                                <img src="../assets/img/girl.png" />
                            </div>
                            <div class="content">
                                <h4>{{ card.cardTitle }}</h4>
                                <p class="sub_title">{{ card.senderName }}</p>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </div>
<!-- Modal -->
  <div class="modal fade bd-example-modal-lg" id="Dashboard_send" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="height:380px;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Card Info</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" style="height:420px;">
          <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-lg-5 col-md-5 col-sm-5 card_cont" >
                    <div class="card_img" >
                        <img v-bind:src = "this.oneCard.cardImgURL" />
                    </div>
                </div>
                <div class ="sender_cont_more col-lg-5 col-md-5 col-sm-5" > 
                        <img v-bind:src="this.oneCard.senderImg" />
                    <div class="content_more">
                        <h4>{{ this.oneCard.cardTitle }}</h4>
                          <p>Date:{{this.oneCard.createDate}}</p> 
                          <p> Status: {{this.oneCard.status}}</p> 
                        <p class="sub_title">From: {{ this.oneCard.senderName }}</p>
                        <div class="message_more">
                           {{this.oneCard.cardContent}} :)
                        </div>
                    </div>
                    <button class="btn btn-primary btn-success btn-send" >Use Card</button>
                </div>


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
// import Nav from './DashboardNav';
import { mapActions } from 'vuex';
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      isReceiveModel: true,
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

      cardsReceive: [],


      cardsSend: [
         
        
      ],

    };
  },
  methods:{
    ...mapActions(['']),
    async showCard(index) {
     
      this.oneCard = this.cards[index];
    },


    async showReceivedCard() {
      this.isReceiveModel =true;
      const userID =  this.$store.state.user.userID || localStorage.getItem("userID");
      console.log("show received card:", userID);
     try{
       if(userID){
            // const response = await axios.get(`/record/record/receiver/${userID}`);
            const response = await axios.get(`/record/record`);
            // this.cards = response.data;
            this.cards = response.data;
            console.log(response.data);
       }else{

       };
       
      }catch(e){
        console.log(e.message);
      };
    },

    async showSendCard() {
      this.isReceiveModel = false;
       
       const userID =  this.$store.state.user.userID || localStorage.getItem("userID");
       console.log("show send card:", userID);
     try{
       if(userID){
            const response = await axios.get(`/record/record/sender/${userID}`);
            // this.cards = response.data;
              this.cards = response.data;
            console.log(response.data);
       }else{

       };
       
      }catch(e){
        console.log(e.message);
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
  margin-top: 8px;
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
.sender_cont_more img{
  width:90px;
  margin-top:25px;
}
.content_more{
  margin-top:15px;
}

.message_more{
  background: #eeeeee;
  border-radius: 5px;
  margin:10px;
  display: block;
  text-align: left;
  padding:15px;
  height:90px;
  font-size:0.9em;
}
.btn-send{
  width:100%;
}
</style>
