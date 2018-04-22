<template>
  <body class="bg">
    <Navbar></Navbar>
    <div class="form-signin">
      <div class="text-center mb-4">
        <img class="mb-4" src="../assets/img/Logo.png" alt="" height="72" width="72">
        <h1 class="h3 mb-3 font-weight-normal" style="color:#fff;">Umise- Login</h1>
      </div>
  
      <div class="form-label-group" :class="{invalid: $v.userData.username.$error }">
        <input id="inputEmail" class="form-control" placeholder="User Name" autofocus="" 
        @blur="$v.userData.username.$touch()" v-model="userData.username">
        <label for="inputEmail">User Name</label>
      </div>
  
      <div class="form-label-group" :class="{invalid: $v.userData.password.$error }">
        <input id="inputPassword" class="form-control" placeholder="Password" type="password" 
        @blur="$v.userData.password.$touch()" v-model="userData.password">
        <label for="inputPassword">Password</label>
      </div>
  
      <div class="checkbox mb-3">
        <label style="color:red">
            {{ error }}
          </label>
      </div>
      <button class="btn btn-lg btn-success btn-block" :disabled="$v.userData.$invalid" @click="handleLogin" 
      @keyup.enter="handleLogin">Sign in</button>
      <router-link to="/resetPassword" tag="a">
        <p style="color:#dcdcdc;text-align:center;padding-top:10px;">Forget Password ?</p>
      </router-link>
      <div>
        <!-- <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" 
        data-show-faces="true" data-auto-logout-link="true" data-use-continue-as="true" onlogin="checkLoginState"></div> -->
        <p style="text-align:center;">or</p>
        <div class="btn btn-primary fb-login-button12" scope="public_profile,email" @click="facebookLogin">
          <span></span> Login with facebook
        </div>
        {{ facebookErr }}
      </div>
      <!-- <p class="mt-5 mb-3 text-muted text-center">Don't have a account,<router-link to="/signup"> Sign up</router-link></p> --> 
    </div>
  </body>
</template>

<script>
  import Navbar from "./Navbar";
  import {
    mapState,
    mapActions
  } from "vuex";
  import {
    required,
    email,
    minLength
  } from "vuelidate/lib/validators";
  import axios from 'axios';
  
  export default {
    name: "login",
    data() {
      return {
        userData: {
          username: "",
          password: ""
        },
        error: "",
        facebookErr: "",
      };
    },
    validations: {
      userData: {
        username: {
          required,
        },
        password: {
          required,
        }
      }
    },
  
    components: {
      Navbar,
    },
    created: function() {
      this.$store.state.user.isLogin = false;
      this.$store.dispatch("tryAutoLogin", this.$router);
    },
  
    methods: {
      ...mapActions(["login", "setAllCardType"]),
  
      facebookLogin() {
        this.facebookErr = "";
        var a = this;
        FB.login(function(response) {
          console.log(response);
          if (response.authResponse) {
            FB.api('/me', {
                locale: 'tr_TR',
                fields: 'id,name,email'
              },
              function(response) {
                 let resp;
                console.log(response.email);
              
                console.log(response.id);
                a.$store.state.user.facebookid = response.id;
                a.$store.state.user.email = response.email;
                let username = response.name.trim().replace(/\ +/g,"");
                a.$store.state.user.userName = username;
                console.log(username);
                try {
                  axios.post('/user/facebooklogin', {
                    "username": username,
                    "email": response.email,
                    "facebookid": response.id
                  }).then((response)=>{
                    resp = response;
                  });
                  console.log("post login:", resp);
                  // a.$store.state.user.userID = resp.data.uid;
                  a.$store.state.user.userID = resp.data.uid;

                  a.$router.push("/dashboard");
                  a.$store.state.user.authenticated = 1;
                } catch (e) {
                   a.facebookErr = e.response.data;
                };
              });
          } else {
            a.facebookErr = "User cancelled login or did not fully authorize";
          }
        });
  
  
      },
   
      async checkFacebookUser() {
        // 1. search for user by username?
  
      },
  
      async handleLogin() {
        try {
          this.error = "";
          const result = await this.login(this.userData);
          console.log("result :", result);
          if (result === 1) {
            // this.getAllCardType();
            this.$router.push("/dashboard");
            console.log("login success !");
          } else if (result === 2) {
            // this.$message({ message: "You need to set a new password" });
            console.log("You have to set a new password !");
            // this.getAllCardType();
            this.$router.push("/mycard");
          }
        } catch (e) {
          this.error = e.response.data;
          console.log("error :", e);
        }
      },
  
    },
    computed: {
      ...mapState({
        loading: state => state.user.loading
      }),
    },
  };
</script>

<style scoped>
  :root,
  body {
    --input-padding-x: 0.75rem;
    --input-padding-y: 0.75rem;
  }
  
  body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #f5f5f5;
    width: 100%;
    height: 100vh;
    min-height: 775px;
    padding-top: 0;
    /* margin-top:-60px; */
    padding-bottom: 0;
    background-image: url("../assets/img/bg2.jpg");
    background-size: cover;
    color: #eee;
  }
  
  img {
    border: 0.3rem solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
  
  .form-signin {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: 0 auto;
  }
  
  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }
  
  .form-label-group>input,
  .form-label-group>label {
    padding: var(--input-padding-y) var(--input-padding-x);
  }
  
  .form-label-group>label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
  }
  
  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }
  
  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }
  
  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }
  
  .form-label-group input::-moz-placeholder {
    color: transparent;
  }
  
  .form-label-group input::placeholder {
    color: transparent;
  }
  
  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
    padding-bottom: calc(var(--input-padding-y) / 3);
  }
  
  .form-label-group input:not(:placeholder-shown)~label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 12px;
    color: #777;
  }
  
  .form-label-group.invalid input {
    border: 1px solid red;
    background: #ffc9aa;
  }
  
  .fb-login-button12 {
    background: #4c69ba;
    background: linear-gradient(#4c69ba, #3b55a0);
    border-color: #4c69ba;
    border-radius: 4px;
    color: #fff;
    width: 100%;
    height: 48px;
  }
</style>
