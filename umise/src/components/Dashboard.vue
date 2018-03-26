<template>
<div id='nav_dashboard' >
    <!--- body -->
    <div id="send_cards" class="body_cont">
        <div class = "send_cards_container" >
            <h4 class="title" >Send Cards</h4>
            <h4 class="subTitle">Choose a Card and send to your friends, or you can design your own card.</h4>
            
            <div class="row">
                <div  v-for = "(card, index) in cards" :key="index"
                class="col-lg-3 col-md-3 col-sm-6 card_cont" >
                    <div class="card_img" data-toggle="modal"
                    data-target="#Dashboard_send" @click= "showCard(index)">
                        <img v-bind:src="card.cardImg" />                        
                        <h4>{{ index }} {{card.cardName}}</h4>
                        <p class="sub_title">{{card.sender}}</p>
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
        <div>
     

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
                        <img v-bind:src = "this.oneCard.cardImg" />
                    </div>
                </div>
                   <div class ="sender_cont_more col-lg-5 col-md-5 col-sm-5" > 
                       
                    <div class="content_more">
                        <h4>{{ this.oneCard.cardName }}</h4>
                        <p class="sub_title">{{ this.oneCard.sender }}</p>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Friend</span>
                          </div>
                          <input type="text" class="form-control" placeholder="Friend Name" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="form-group">         
                            <select class="form-control" id="exampleFormControlSelect1">
                              <option checked>Forever</option>
                              <option>1 Day</option>
                              <option>1 Week</option>
                              <option>1 Month</option>
                              <option>1 Year</option>
                            </select>
                          </div>

                        <textarea class="form-control message_more" maxlength="140">How you have a great weekend, I will treat you a great dinner Next time :)
                        </textarea>
                    </div>
                    <button class="btn btn-primary btn-success btn-send" >Send to Friends</button>
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
import Friends from './Friends';


export default {
  data() {
    return {
      name: 'kuer',
      oneCard: {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img1,
          sender: 'From Kuer and Enjoy',
          senderImg:this.$store.state.card.girl,
      },    
      cards: [
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img1,
          sender: 'From Kuer and Enjoy',
          senderImg:this.$store.state.card.girl,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img2,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.girl,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img3,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.girl,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img4,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.girl,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img5,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.boy,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img6,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.boy,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img7,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.boy,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img8,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.boy,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img9,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.girl,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img10,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.boy,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img11,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.girl,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img12,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.boy,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img13,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.girl,
        },
        {
          cardName: 'Dinning Card',
          cardImg: this.$store.state.card.img14,
          sender: 'From Kuer and Enjoy',
          senderImg: this.$store.state.card.girl,
        },

      ],
    };
  },
  components: {
    Friends,
  },
  methods:{
    showCard(index) {
  
      this.oneCard = this.cards[index];
    }
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

.modal-dialog-centered{
  overflow: hidden;
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
  margin:0px;
  display: block;
  text-align: left;
  padding:15px;
  height:100px;
  font-size:0.85em;
  overflow: hidden;
  margin-bottom: 20px;
}
.btn-send{
  width:100%;
}
</style>
