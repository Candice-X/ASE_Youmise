<template>
<body class="bg">
  <Navbar></Navbar>
  <form class="form-signin">
      <div class="text-center mb-4">
        <img class="mb-4" src="../assets/img/Logo.png" alt="" height="72" width="72">
        <h1 class="h3 mb-3 font-weight-normal" style="color:#fff;">Umise- Login</h1>
       </div>

      <div class="form-label-group">
        <input id="inputEmail" class="form-control" placeholder="Email address"
        srequired="" autofocus="" type="email">
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input id="inputPassword" class="form-control" placeholder="Password"
        required="" type="password">
        <label for="inputPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input value="remember-me" type="checkbox"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-success btn-block" type="submit">Sign in</button>
      <!-- <p class="mt-5 mb-3 text-muted text-center">Don't have a account,<router-link to="/signup"> Sign up</router-link></p> -->
    </form>
</body>
</template>

<script>
import Navbar from './Navbar';

export default {
  components: {
    Navbar,
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
</style>
