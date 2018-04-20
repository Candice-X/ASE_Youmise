<template>
<div id='message' >
    <!--- body -->
    <div id="send_cards" class="body_cont">
        <div class = "send_cards_container" >
            <h4 class="title" >Messages</h4>
            <!-- <h4 class="subTitle">Messages from your friends</h4> -->
        <br />
        <button class="btn btn-primary btn-outline-success" :class= "{active: !isMessage}" @click="getFriendsRequest" >Friends Request</button>
        <button class="btn btn-primary btn-outline-success " :class= "{active: isMessage}" @click="getAllMessages" > Messages</button>
       
           <div class="row" v-if="isMessage">
                <!-- if empty -->
              <div class="empty_msg" style="" v-if="messages.length===0">
                You don't have any Messages right now
                <!-- <button class="btn btn-secondary btn-primary"> Add Friends </button> -->
              </div>
                <div v-for = "(message, index) in messages" :key="index" class="col-lg-4 col-md-4 col-sm-6 card_cont" >
                    <div class="card_img" >   
                      <div class ="sender_cont" >
                            <div class ='avatar' style="position:relative; top:10px; float:left;">
                                <img src="../assets/img/girl.png"/>
                            </div>
                            <div class="content" style="width:190px;">
                                <h4>{{ message.title }} </h4>
                                <!-- <p class="sub_title" >{{message.cardTitle}}</p> -->
                                <p class="sub_title">{{ message.cardContent }} </p>
                                <p class="" >Content: <br/>{{message.msgContent}}</p>
                                
                            </div>
                      </div>  
                       <div v-if="message.status==='SENT'">
                          <button class="btn btn-primary btn-success col-sm-6" @click="acceptRequest(message.friendRequestId)" >Accept</button>
                          <button class="btn btn-primary btn-secondary col-sm-4" @click="rejectRequest(message.friendRequestId)" >Decline</button>
                        </div>
                        <div v-else>
                            <!-- <button class="btn btn-secondary btn-primary col-sm-10" style="font-size:0.8em;" disabled >You have <strong>{{message.status}} </strong> </button> -->
                        </div>
                    </div>
                     
                    <!-- button -->
                    
                </div>


            </div>
            <!-- end of row -->


            <div class="row" v-if="!isMessage">
                <!-- if empty -->
              <div class="empty_msg" style="" v-if="friendRequests.length===0">
                You don't have any Friend Request right now
                <!-- <button class="btn btn-secondary btn-primary"> Add Friends </button> -->
              </div>
                <div v-for = "(request, index) in friendRequests" :key="index" class="col-lg-4 col-md-4 col-sm-6 card_cont" >
                    <div class="card_img" >   
                      <div class ="sender_cont" >
                            <div class ='avatar' >
                                <img src="../assets/img/girl.png"/>
                            </div>
                            <div class="content">
                                <h4>{{ request.senderUsername }} send a friend request </h4>
                                <p class="sub_title" >{{request.createdAt.substring(0,10)}}</p>
                                <p class="sub_title"> {{ request.senderUsername }} want to add you as a new friend</p>
                                <p class="" >Status: {{request.status}}</p>
                            </div>
                      </div>  
                       <div v-if="request.status==='SENT'">
                          <button class="btn btn-primary btn-success col-sm-6" @click="acceptRequest(request.friendRequestId)" >Accept</button>
                          <button class="btn btn-primary btn-secondary col-sm-4" @click="rejectRequest(request.friendRequestId)" >Decline</button>
                        </div>
                        <div v-else>
                            <button class="btn btn-secondary btn-primary col-sm-10" style="font-size:0.8em;" disabled >You have <strong>{{request.status}} </strong> </button>
                        </div>
                    </div>
                     
                    <!-- button -->
                    
                </div>


            </div>
            <!-- end of row -->
         
           



        </div>
       

    </div>

</div>
</template>

<script>
// import Nav from './DashboardNav';
// import Friends from './Friends';
import axios from "axios";

export default {
  data() {
    return {
      name: 'kuer',
      isMessage: true,
      // imgUrl:'',
      messages:[],
      friendRequests:[
        // {
        // friendRequestId:1,
        // senderId:'',
        // senderUsername:'kuer',
        // receiverId:'',
        // receiverUsername:'kjjkj',
        // status:'',
        // createdAt:'2018-01-01',
        // updateAt:'',
        // },
      ],
    };
  },
  components: {
   
  },

  methods:{
    async getAllMessages(){
      this.isMessage = true;
    const userID =  this.$store.state.user.userID || localStorage.getItem("userID");
     try{
       if(userID){
          this.$store.state.user.loading = true;
            const response = await axios.get(`/message/message/sender/${userID}`);
            // const response = await axios.get(`/record/record`);
            // this.cards = response.data;
            this.messages = response.data;
            this.$store.state.user.loading = false;
            console.log(response.data);
             
       }else{

       };    
      }catch(e){
         this.$store.state.user.loading = false;
        console.log(e.message);
      };
    },

    async getFriendsRequest(){
      this.isMessage = false;
        try{
          
          if(this.$store.state.user.userID != null ){ 
             this.$store.state.user.loading = true;
            const response = await axios.get(`/friend/listFriendRequest/${this.$store.state.user.userID}`); 
            this.friendRequests = response.data;  
             this.$store.state.user.loading = false;
          }else{
            throw new Error("You need to login first");
          };

        }catch(e){
          console.log(e);
           this.$store.state.user.loading = false;
          // this.errorMsg = e.response.data;
        };
    },

    async acceptRequest(requestId){
        try{
          console.log("userId: ",this.$store.state.user.userID);
          if(this.$store.state.user.userID != null ){ 
             this.$store.state.user.loading = true;
            const response = await axios.post("/friend/updateFriendRequest/",{"friendRequestId":requestId,"status":"APPROVED"}); 
           
             this.$store.state.user.loading = false;
          }else{
            throw new Error("You need to login first");
          };
          //refresh the request list
          this.getFriendsRequest();

        }catch(e){
           this.$store.state.user.loading = false;
          console.log(e);
          // this.errorMsg = e.response.data;
        };
    },

    async rejectRequest(requestId){
      try{
          console.log("userId: ",this.$store.state.user.userID);
          if(this.$store.state.user.userID != null ){ 
             this.$store.state.user.loading = true;
            const response = await axios.post("/friend/updateFriendRequest/",{"friendRequestId":requestId,"status":"REJECTED"}); 
           
             this.$store.state.user.loading = false;
          }else{
            throw new Error("You need to login first");
          };
          //refresh the request list
          this.getFriendsRequest();

        }catch(e){
          console.log(e);
           this.$store.state.user.loading = false;
          // this.errorMsg = e.response.data;
        };
  
    },
    

  },

  // computed(){
  //  imgUrl=this.$store.state.card.img1;
  // },
//  mounted(){
//    this.imgUrl= this.$store.state.card.img1;
//  },
  created: function() {
    this.$store.state.isLogin = true;
    // this.imgUrl = this.$store.state.card.img1;
    this.getFriendsRequest();
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
.empty_msg{
  margin:auto;
  text-align:center;
  margin-top:10em;
  color:white;
  font-size:1rem;
}
.send_cards_container button {
  color: #ffffff;
  margin-left: 15px;
}
.sender_cont {
  width: 100%;
  text-align: left;
  margin-top: 0;
  padding: 10px;
}

.avatar {
  position: relative;
  top: -75px;
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
  width: 200px;
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
  width: 280px;
  margin: 0px 25px;
  background: #dcdcdc;
  height: 220px;
  border-radius: 5px;
}
/* .card_img:hover {
  background: #3ac17e;
  opacity: 0.9;
  cursor: pointer;
  border: 2px dashed #fff;
  color: #fff;
} */
.customize-icon-cont {
  border: 4px dashed #fff;
  width: 280px;
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
#message {
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

h1,
h2,
h3,
h4,
h5,
h6 {
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
.time{

  float:right;
  height:20px;
  font-size:10px;
  margin-top:-18px;
  color:#555;
}
@media (max-width:768px){
  #message {
    padding-top:55px;
  }
}
</style>
