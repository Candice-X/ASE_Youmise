import apis from '../../api/user';
import { init } from '../../api/apiGatewayClient';
import * as types from '../mutation-types';

const state = {
  userName: null,
  idToken: null,
	userID: null, 
	// UUID: null,
  isLogin: false,
  facebookid:'',
  loading: false,
  authenticated: 0,
  challengeData: {},
  friendList:[],
  currentFriendId:'',
};

const mutations = {
	[types.USER_LOGIN_REQUEST](state) {
    state.loading = true;
    state.authenticated = 0;
  },

  [types.USER_LOGIN_SUCCESS](state, { idToken }) {
    state.loading = false;
    state.authenticated = 1;
    // const keys = credentials.data.Credentials;
    // init(keys.AccessKeyId, keys.SecretKey, keys.SessionToken);
  },

  [types.USER_LOGIN_FAILURE](state) {
    state.loading = false;
    state.authenticated = 0;
  },

  [types.USER_LOGIN_PASS_CHALLENGE_NEEDED](state, { data }) {
    state.loading = false;
    state.authenticated = 2;
    delete data.userAttributes.email_verified;
    state.challengeData = data;
  },

  [types.USER_LOGIN_PASS_CHALLENGE_REQUEST](state) {
    state.loading = true;
    state.challengeData.cognitoUser = null;
  },

  [types.USER_LOGIN_PASS_CHALLENGE_SUCCESS](state, { idToken }) {
    state.loading = false;
    state.authenticated = 1;
    // const keys = credentials.data.Credentials;
   // init(keys.AccessKeyId, keys.SecretKey, keys.SessionToken);
  },

  [types.USER_LOGIN_PASS_CHALLENGE_FAILURE](state) {
    state.loading = false;
  },

	authUser(state, userData) {
		state.userName = userData.userName;
		state.idToken = userData.idToken;
		state.userID = userData.userID;
		state.isLogin = true;
		state.authenticated = 1;
		// state.UUID =userData.UUID;
		},
	
  clearAuthData(state) {
    state.idToken = null;
    state.userName = null;
		state.userID = null;
		state.isLogin = false;
		state.authenticated =0;
		// state.UUID = null;
  },

};

const actions = {
	async login({ commit }, { username, password }) {
    commit(types.USER_LOGIN_REQUEST);
    try {
			const response = await apis.login(username, password);
			
			console.log("store login status :",response);
      if (response.status === 1) {
				  //store in local storage
				const now = new Date();
				
				const expirationDate = new Date(now.getTime() + response.data.payload.exp);
				console.log("Time exp: ",expirationDate);

				const idToken = response.data.jwtToken;
				const userID = response.data.payload['custom:uid'];
				 
				localStorage.setItem('idToken', idToken);
				localStorage.setItem('userName', username);
				localStorage.setItem('userID', userID);
				localStorage.setItem('expirationDate', expirationDate);
				
				commit('authUser', {
					'idToken': idToken,
					'userID': userID,
					'userName': username,
				});

        commit(types.USER_LOGIN_SUCCESS, { credentials: response.data });
      } else if (response.status === 2) {
        commit(types.USER_LOGIN_PASS_CHALLENGE_NEEDED, { data: response.data });
      }
      return response.status;
    } catch (e) {
      commit(types.USER_LOGIN_FAILURE);
      throw e;
    }
  },


  setLogoutTime({ commit }, expirationTime) {
    setTimeout(() => {
      commit('logout');
    }, expirationTime * 1000);
  },

  logout({ commit }, routerData) {
    commit('clearAuthData');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('idToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    routerData.push('/login');
	},
	
  tryAutoLogin({commit},routerData) {
    const token = localStorage.getItem('idToken');
    if (!token) {
      return;
    }
    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date();
    if (now >= expirationDate) {
      return;
    }
    const userID = localStorage.getItem('userID');
		const userName = localStorage.getItem('userName');
		console.log('username',userName);
    commit('authUser', {
      'idToken': token,
      'userID': userID,
      'userName': userName,
		});
		routerData.push('/mycard');
  },


  // async authenticate({ commit }) {
  //   commit(types.USER_LOGIN_REQUEST);
  //   try {
  //     const credentials = await apis.authenticate();
  //     commit(types.USER_LOGIN_SUCCESS, { credentials });
  //   } catch (e) {
  //     commit(types.USER_LOGIN_FAILURE);
  //     throw e;
  //   }
  // },
};

const getters = {
	getUserName(){
		return state.userName;
	},
};

export default {
  state,
  mutations,
	actions,
	getters,
};
