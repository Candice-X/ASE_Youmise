<template>
<body class="bg">
  <Navbar></Navbar>
  <div class="form-signin">
      <div class="text-center mb-4">
        <img class="mb-4" src="../assets/img/Logo.png" alt="" height="72" width="72">
        <h1 class="h3 mb-3 font-weight-normal" style="color:#fff;">Umise - Sign Up</h1>
       </div>
      <!--- This is the sign up div -->
      <div id="signup_div" v-show = '!submittedValue' >
        <div class="form-label-group" :class="{ invalid: $v.user.username.$error }">
          <input id="inputUserName" class="form-control" placeholder="UserName"
          @blur="$v.user.username.$touch()" v-model ="user.username">
          <label for="inputUserName">User Name</label>
        </div>
        <!-- <p v-if="!$v.user.username.required" >Username is required</p> -->

        <div class="form-label-group" :class="{ invalid: $v.user.email.$error }">
          <input  id="inputEmail" class="form-control" placeholder="Email address"
          @blur="$v.user.email.$touch()" v-model ="user.email">
          <label for="inputEmail">Email address</label>
        </div>
        <!-- <p v-if="!$v.user.email.required" >Email should not be empty</p> -->
        <!-- <p v-if="!$v.user.email.email" >Please provide a valid email address</p> -->
        
        <div class="form-label-group" :class="{ invalid: $v.user.password.$error }">
          <input id="inputPassword" class="form-control" placeholder="Password" 
          @blur="$v.user.password.$touch()" type="password" v-model="user.password">
          <label for="inputPassword">Password</label>
        </div>
        <!-- <p v-if="!$v.user.password.required" >Password should at lesst have 8 character with letters and numbers </p> -->
        
         <div class="form-label-group" :class="{ invalid: $v.user.repeatPassword.$error }">
          <input id="inputRepeatPassword" class="form-control" placeholder="Repeat Password" 
          @blur="$v.user.repeatPassword.$touch()" type="password" v-model="user.repeatPassword">
          <label for="inputRepeatPassword">Repeat Password</label>
        </div>
        <!-- <p v-if="!$v.user.repeatPassword.required" >Password are not not the same </p> -->



        <label>{{ errorMsg }}</label>
        <button class="btn btn-lg btn-success btn-block" 
        :disabled="$v.user.username.$invalid || $v.user.email.$invalid || $v.user.password.$invalid 
        || $v.user.repeatPassword.$invalid" v-on:click= "submitSignup"  name = 'sign_up' >Sign Up</button>
      </div>
   
      <!-- This is the validation code div -->
      <transition name="fade">
        <div id="validate_div" v-if = "submittedValue" >
        <label class="message"> We have send the validation code to the Email : {{ user.email }}</label>
      <div class="form-label-group">

        <input id="validateCode" class="form-control" placeholder="UserName" autofocus="" type=""
        @blur ="$v.user.confirmationCode" v-model ="user.confirmationCode" >
        
        <label for="validateCode">Validate Code</label>
         <!-- <p v-if="!$v.confirmationCode.required" >Confirmation Code should be 6 numbers </p> -->
      </div>

      <label>{{validateMsg}}</label>
      <button class="btn btn-lg btn-success btn-block" :disabled="$v.user.confirmationCode.$invalid"  @click="validateCode" >Validate Email </button>

      </div>
      </transition>
      <!-- <p class="mt-5 mb-3 text-muted text-center">Don't have a account,<router-link to="/signup"> Sign up</router-link></p> -->
    </div>
</body>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        username:'',
        email: '',
        password:'',
        confirmationCode:'',
        repeatPassword:'',  
      },
      submittedValue: false,
      errorMsg:'',
      validateMsg:'',
    };
  },
  validations: {
  
  user: {
      email:{
      email,
      required,
    },
    username:{
      required,
    },
    password: {
      required,
      minLength:minLength(8),
    },
    repeatPassword:{
      sameAs: sameAs('password'),
    },
    confirmationCode: {
      required,
      minLength: minLength(6),
    }
  },
   
  },
  methods: {
    submitSignup() {
        //if the input is validated
      if(this.user.password.length<8){
        this.errorMsg ="password has to be more than 8 characters";
        return;
      }
      if(this.user.username.length!=0 && this.user.email.length!=0 && this.user.password.length>=8){
      // request server for sign up
       this.errorMsg ="";

        axios.post("/user/signup",this.user)
        .then(res => {       
          console.log("response !!!!!",res);
          // const data = res.data;
          console.log(res.data);
          // console.log(user);   
          this.submittedValue = true; 
        })
        .catch(error => {
        if(typeof error.response ==='undefined'){
          return;
        }else{
            if(error.response){
            //请求已发出，但服务器使用状态代码进行响应
            //落在2xx的范围之外
            this.errorMsg = error.response.data;
            
            console.log("data",error.response.data);
            console.log("status",error.response.status);
            console.log("header",error.response.headers);

          } else {
            //在设置触发错误的请求时发生了错误
            console.log('Error',error.message);
          }
        }
      });
      }else{
        this.errorMsg =" Fileds should not be empty";
      }
    },

    validateCode() {
      this.validateMsg ='';
      if(this.user.confirmationCode.length !=6){
         this.validateMsg = "validation code length should be 6 digitals";
         return false;
      }else{
        this.validateMsg ='';
          axios.post("/user/verification",this.user)
          .then(res=>{  
            console.log("response verification!",res);
            // const data = res.data;
            console.log(res.data);
            console.log("success sign up, please login");

            this.$router.push({path:'/login'});
              
            // console.log(user);    
          })
          .catch(error => {
          if(typeof error.response ==='undefined'){
            return;
          }else{
              if(error.response){
              //请求已发出，但服务器使用状态代码进行响应
              //落在2xx的范围之外
              this.validateMsg = error.response.data;
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else {
              //在设置触发错误的请求时发生了错误
              console.log('Error',error.message);
            }
          }
        });
      };
    }
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

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
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

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
.message {
  font-size: 1em;
}

img {
  border: 0.3rem solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}
.fade-enter {
  opacity:0;

}

.fade-enter-active {
  transition:opacity 1s;
}

.fade-leave {

}
.fade-leave-active{
  transition: opacity 1s;
  opacity:0;
}

.slide-enter {
 
}
.slide-enter-active {
   animation: slide-in 1s ease-out forwads;
   transition: opacity .5s;
}
.slide-leave {

}
.slide-leave-active {
   animation: slide-out 1s ease-out forwads;
   transition: opacity .5s;
   opacity: 0;
}
@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
  
}

/* input.invalid label{
  color:red;
}  */
.form-label-group.invalid input {
  border : 1px solid red;
  background: #ffc9aa;
}
</style>
