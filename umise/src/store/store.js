import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.store({
    state: {
        //user info 
        User:{
            userName:'',
            userToken:'',
            UserID:'',
        },
    },
    getters:{

    },
});