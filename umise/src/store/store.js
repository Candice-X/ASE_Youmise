import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    User: {
        userName: null,
        idToken: null,
        userID: null,
    },
    isLogin: false,
    },
    mutations:{
       authUser (state, userData) {
           state.userName = userData.username;
           state.idToken = userData.token;
           state.userID = userData.userID;
       },
       clearAuthData(state) {
           state.idToken = null;
           state.userName = null;
           state.userID = null;
       }
  
    },
    actions: {
        setLogoutTime({commit},expirationTime) {
            setTimeout(() =>{
                commit('logout');
            },expirationTime *1000);
        },

        signup({commit},authData){
            
        },

        login({commit, dispatch},authData) {
                
            //success, status 200. Then auth user 

            //store in local storage
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);

            localStorage.setItem('idToken', res.data.idToken);
            localStorage.setItem('userName', res.data.userName);
            localStorage.setItem('userID', res.data.userID);
            localStorage.setItem('expirationDate', expirationDate);

            // commit('authUser',{
            //     idToken: res.data.idToken;
            //     userID 
            // });

            //if success, set the expiration TIME for the auto logout
            //  dispatch('setLogoutTime',res.data.expiresIn);   
        },
        fetchUser({commit}) {

        },
        logout({commit},routerData) {
            commit('clearAuthData');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('idToken');
            localStorage.removeItem('userName');
            localStorage.removeItem('userID');
            routerData.push('/');
        },
        tryAutoLogin() {
            const token = localStorage.getItem('idToken');
            if(!token) {
                return;
            }
            const expirationDate = localStorage.getItem('expirationDate');
            const now = new Date();
            if(now >= expirationDate){
                return;
            }
            const userID = localStorage.getItem('userID');
            const userName = localStorage.getItem('userName');
            commit('authUser', {
                idToken: token,
                userID: userID,
                userName: userName,
            });
        }

    },
    getters: {

    }
});
