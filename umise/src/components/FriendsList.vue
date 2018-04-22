<template>
  <div>  
    <div class="friend_btn">
      <button class="btn btn-primary btn-sm btn-outline-success show_friendlist" @click="friend_list=true"><span class="nav-link js-scroll-trigger" ><i class="icon-people"></i>Friends</span></button>
    </div>
  
    <div class="friends friends_mobi" v-if="friend_list">
      <button class="btn btn-primary btn-outline-success btn-sm addFriendsBtn" style="width:85%;margin:15px;" data-toggle="modal" data-target="#add_friends">Add Friend</button>
      <hr />
      <div v-for="(friend, index) in friendsList" :key="index" class="friend" :class="{friend_active:friend.uid === currentFriendId}" @click="setCurrentFriend(friend.uid)">
        <div class="friends_img">
          <img src="../assets/img/girl.png" />
        </div>
        <div class="friens_info">
          <h4>{{friend.username}} </h4>
          <div class="card_info">
            <span class="card_send"><i class="icon-present" ></i> 77 </span>
            <span class="card_send"><i class ="icon-action-redo "></i> 126</span>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        friend_list: true,
        friendsList: [],
        currentFriendId: '',
      }
    },

    methods: {
      async getFriendsList() {
        try {
          const userID = this.$store.state.user.userID || localStorage.getItem("userID");
          if (userID) {
            const response = await axios.get(`/friend//listFriends/${userID}`);
            console.log(response.data);
            this.$store.state.user.friendList = response.data;
            this.friendsList = this.$store.state.user.friendList;
            console.log("friendsList :", this.friendsList);
          } else {
  
          };
        } catch (e) {
          console.log(e.response.data);
        };
      },
  
      setCurrentFriend(friendId) {
        this.currentFriendId = friendId;
        if (jQuery(window).width() < 992) {
          this.friend_list = false;
        }; 
        this.$store.state.user.currentFriendId = friendId;
        this.$emit('refreshFriendCards');
      },
  
    },
    mounted() {
      this.getFriendsList();
    },
  
  };
</script>

<style>
  @import '../assets/css/simple-line-icons.css';

  @media (max-width:768px) {
    .friends_mobi {
      /* display: none; */
      width: 100% !important;
    }
    .friends {
      background: rgba(0, 0, 0, 0.9)!important;
    }
    .friend_btn {
      position: fixed !important;
      bottom: 20px;
      width: 100%;
      display: block !important;
      margin: auto;
    }
    .show_friendlist {
      width: 80%;
    }
    .friend {
      width: 100% !important;
    }
    .friends_img {
      margin-left: 50px !important;
    }
    .close_friendList {
      display: block;
      position: fixed !important;
      bottom: 0;
      height: 40px;
      background: red;
    }
  }
  
  .close_friendList {
    display: none;
  }
  
  .friend_btn {
    display: none;
  }
  
  .friends {
    position: fixed;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    height: 100%;
    width: 240px;
    color: #fff;
    padding-top: 10px;
  }
  
  .friend {
    width: 240px;
    margin: 0;
    padding: 0;
    height: 55px;
    border-radius: 0px;
    cursor: pointer;
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  }
  
  .friends_list {
    margin-left: 10px;
    margin-top: 30px;
    font-size: 1em;
  }
  
  .friends hr {
    border-bottom: 1px solid rgba(23, 23, 23, 0.3);
    padding: 0;
    margin: 0;
  }
  
  .friens_info h4 {
    font-size: 0.9em;
    margin-top: 5px;
    margin-left: 5px;
  }
  
  .friend:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .friend:active {
    background: #3ed188;
  }
  
  .friend_active {
    background: #35b475;
  }
  
  .friends_list_close {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
  
  .friends_list_close:hover {
    color: rgb(253, 115, 115);
    font-size: 1.1em;
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
    font-size: 0.7em;
    color: #dcdcdc;
    cursor: pointer;
  }
  
  .card_info span {
    margin: 0;
    padding: 0;
    margin-left: 5px;
    padding-right: 15px;
  }
  
  .friends_img img {
    width: 40px;
    height: 40px;
    margin: 5px;
  }
  
  .friens_info {
    display: block;
    float: left;
    height: 100%;
    width: 165px;
    text-align: left;
  }
  
  @media (max-width: 991px) {
    .addFriendsBtn {
      margin-top: 55px !important;
    }
    .friend {
      padding: 10px 0 10px 0;
      height: 70px;
    }
  }
</style>