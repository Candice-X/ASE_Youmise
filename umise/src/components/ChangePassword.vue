<template>
  <body class="bg">
    <Navbar></Navbar>
    <div class="form-signin">
      <div class="text-center mb-4">
        <img class="mb-4" src="../assets/img/Logo.png" alt="" height="72" width="72">
        <h1 class="h3 mb-3 font-weight-normal" style="color:#fff;">Reset Password</h1>
      </div>
      <div class="form-label-group" :class="{invalid: $v.userData.password.$error }">
        <input id="inputPassword" class="form-control" placeholder="Old Password" type="Old Password" 
        @blur="$v.userData.password.touch()" v-model="userData.password">
        <label for="inputPassword">Password</label>
      </div>
  
      <div class="form-label-group" :class="{invalid: $v.userData.password.$error }">
        <input id="inputPassword" class="form-control" placeholder="New Password" type="New Password" 
        @blur="$v.userData.password.touch()" v-model="userData.password">
        <label for="inputPassword">Password</label>
      </div>
  
      <div class="checkbox mb-3">
        <label>
          {{ error }}
        </label>
      </div>
      <button class="btn btn-lg btn-success btn-block" :disabled="$v.userData.$invalid" @click="handleLogin" 
      @keyup.enter="handleLogin">Sign in</button>
      <!-- <p class="mt-5 mb-3 text-muted text-center">Don't have a account,<router-link to="/signup"> Sign up</router-link></p> -->
    </div>
  </body>
</template>

<script>
  import Navbar from "./Navbar";
  import { mapState, mapActions } from "vuex";
  import { required, email, minLength } from "vuelidate/lib/validators";
  
  export default {
    name: "login",
    data() {
      return {
        userData: {
          username: "",
          password: ""
        },
        error: ""
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
    computed: {
      ...mapState({
        loading: state => state.user.loading
      })
    },
    components: {
      Navbar,
    },
    created: function() {
      this.$store.state.user.isLogin = false;
      this.$store.dispatch("tryAutoLogin", this.$router);
    },
  
    methods: {
      ...mapActions(["login"]),
      async handleLogin() {
        try {
          const result = await this.login(this.userData);
          console.log("result :", result);
          if (result === 1) {
            this.$router.push("/dashboard");
          } else if (result === 2) {
            // this.$message({ message: "You need to set a new password" });
            console.log("You have to set a new password !");
            this.$router.push("/dashboard");
          }
        } catch (e) {
          this.error = e.response.data;
          console.log("error :", e);
        }
      }
    }
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
</style>
