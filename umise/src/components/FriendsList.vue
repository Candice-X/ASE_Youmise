<template>
  <div class="friends" v-if="friend_list" >
  <h4 class="friends_list"> Friends List
       <!-- <i class="icon-close friends_list_close" @click="friend_list=false"></i> -->
       </h4> 
 <hr />
    <div class="friend">
      <div class="friends_img" >
        <img src="../assets/img/girl.png" />
      </div>
      <div class="friens_info">
        <h4>Frank </h4>
        <div class="card_info" >
          <span class="card_send"><i class="icon-present" ></i> 77 </span>
          <span class="card_send"><i class ="icon-action-redo "></i> 126</span>
        </div>
      </div>  
    </div>

    <div class="friend friend_active">
      <div class="friends_img" >
        <img src="../assets/img/Logo.png" />
      </div>
      <div class="friens_info">
        <h4>Jack </h4>
        <div class="card_info" >
          <span class="card_send"><i class="icon-present" ></i> 77 </span>
          <span class="card_send"><i class ="icon-action-redo "></i> 126</span>
        </div>
      </div>  
    </div>

    <div class="friend">
      <div class="friends_img" >
        <img src="../assets/img/girl.png" />
      </div>
      <div class="friens_info">
        <h4>Tony </h4>
        <div class="card_info" >
          <span class="card_send"><i class="icon-present" ></i> 77 </span>
          <span class="card_send"><i class ="icon-action-redo "></i> 126</span>
        </div>
      </div>  
    </div>

    <div class="friend">
      <div class="friends_img" >
        <img src="../assets/img/Logo.png" />
      </div>
      <div class="friens_info">
        <h4>Dorothy </h4>
        <div class="card_info" >
          <span class="card_send"><i class="icon-present" ></i> 77 </span>
          <span class="card_send"><i class ="icon-action-redo "></i> 126</span>
        </div>
      </div>  
    </div>



  </div>
</template>

<script>

export default {
  data(){
    return{
      friend_list: true,
    }
  },
  components: {
    // Dashboard,
  }
};
</script>

<style>
@import '../assets/css/simple-line-icons.css';

.friends {
  position: fixed;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.9);
  height: 100%;
  width: 240px;
  color:#fff;
  padding-top:10px;
}
.friend {
  width:240px;
  margin:0;
  padding:0;
  height:55px;
  border-radius: 0px;
  cursor: pointer;
  border-bottom:1px solid rgba(100,100,100,0.3);
}
.friends_list{
  margin-left:10px;
  font-size:1em;
}
hr { 
  /* color:#ffffff !important; */
  border-bottom:1px solid rgba(23,23,23,0.3);
  padding:0;margin:0;
}
.friens_info h4{
  font-size:0.9em;
  margin-top: 5px;
  margin-left:5px;
}

.friend:hover {
  background: rgba(255,255,255,0.3);
}
.friend:active {
  background: #3ed188;
}
.friend_active {
  background: #35b475;
}


.friends_list_close{
  position: absolute;
  right:10px;
  cursor: pointer;
}
.friends_list_close:hover {
  color:rgb(253, 115, 115);
  font-size:1.1em;

}
.friends_img {
  width:50px;
  height:50px;
  display: block; 
  position: relative;
  top:0;
  margin:0px;
  padding:0;
  float: left;
  margin-left:8px;
}

.card_info {
  font-size:0.7em;
  color:#dcdcdc;
  cursor: pointer;
}
.card_info span {
  margin:0;
  padding:0;
  margin-left:5px;
  padding-right:15px;
}

.friends_img img{
  width:40px;
  height:40px;
  margin:5px;
}
.friens_info { 
  display: block;
  float:left;
  height:100%;
  width:165px;
  text-align:left;

}

</style>