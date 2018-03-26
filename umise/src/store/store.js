import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import card from './modules/card';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user,
        card,
    },
});

    // mutations:{

    // },
    // actions: {
    //     setLogoutTime({commit},expirationTime) {
    //         setTimeout(() =>{
    //             commit('logout');
    //         },expirationTime *1000);
    //     },

    //     signup({commit},authData){
            
    //     },

    //     login({commit, dispatch},authData) {
                
    //         //success, status 200. Then auth user 

    //         //store in local storage
    //         const now = new Date();
    //         const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);

    //         localStorage.setItem('idToken', res.data.idToken);
    //         localStorage.setItem('userName', res.data.userName);
    //         localStorage.setItem('userID', res.data.userID);
    //         localStorage.setItem('expirationDate', expirationDate);

    //         // commit('authUser',{
    //         //     idToken: res.data.idToken;
    //         //     userID 
    //         // });

    //         //if success, set the expiration TIME for the auto logout
    //         //  dispatch('setLogoutTime',res.data.expiresIn);   
    //     },
    //     fetchUser({commit}) {

    //     },
    //     logout({commit},routerData) {
    //         commit('clearAuthData');
    //         localStorage.removeItem('expirationDate');
    //         localStorage.removeItem('idToken');
    //         localStorage.removeItem('userName');
    //         localStorage.removeItem('userID');
    //         routerData.push('/');
    //     },
    //     tryAutoLogin() {
    //         const token = localStorage.getItem('idToken');
    //         if(!token) {
    //             return;
    //         }
    //         const expirationDate = localStorage.getItem('expirationDate');
    //         const now = new Date();
    //         if(now >= expirationDate){
    //             return;
    //         }
    //         const userID = localStorage.getItem('userID');
    //         const userName = localStorage.getItem('userName');
    //         commit('authUser', {
    //             idToken: token,
    //             userID: userID,
    //             userName: userName,
    //         });
    //     }

    // },
    // getters: {

    // }

