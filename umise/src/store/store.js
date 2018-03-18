import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //user info 
        User:{
            userName:'',
            userToken:'',
            UserID:'',
        },
        isLogin:false,
    },
    // mutations:{
    //     setLogin() {
    //         this.isLogin = true;
    //     }
    // },
});