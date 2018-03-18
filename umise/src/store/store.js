import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    User: {
        userName:'',
        idToken:'',
        UserID:'',
    },
    isLogin: false,
    },
    mutations:{
    //    authUser (state, userData) {
    //        userName = userData.username;
    //        state.idToken = userData.token;
    //        state.UserID = userData.localID;
    //    },
  
    },
    actions: {
        signup({commit},authData){
            
        },
        login({commit},authData) {

        },
    //     storeUser({commit}) {
    //         axios.post("http://cat-named-doggie-dev.us-east-2.elasticbeanstalk.com/user/login",this.user)
    //         .then(res=>{       
    //           console.log("response !!!!!",res);
    //           // const data = res.data;
    //           console.log(res.data);
    //           // console.log(user);   
    //           this.submittedValue = true; 
    //         })
    //         .catch(error => {
    //         if(error.response){
    //         //请求已发出，但服务器使用状态代码进行响应
    //         //落在2xx的范围之外
    //         this.errorMsg = error,response.data;
            
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    
    //       } 
    //     });
    // },
    },

});
