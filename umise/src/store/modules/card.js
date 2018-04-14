const state = {
  // img1: require('../../../static/card/1.jpg'),
  // img2: require('../../../static/card/2.jpg'),
  // img3: require('../../../static/card/3.png'),
  // img4: require('../../../static/card/4.png'),
  // img5: require('../../../static/card/5.png'),
  // img6: require('../../../static/card/6.png'),
  // img7: require('../../../static/card/7.png'),
  // img8: require('../../../static/card/8.png'),
  // img9: require('../../../static/card/9.png'),
  // img10: require('../../../static/card/10.png'),
  // img11: require('../../../static/card/11.png'),
  // img12: require('../../../static/card/12.png'),
  // img13: require('../../../static/card/card1.png'),
  // img14: require('../../../static/card/card2.png'),

  girl: require('../../../static/girl.png'),
  boy: require('../../../static/Logo.png'),
  cards:[],
  sendCardTypes:[],
};


const mutations = {
  SET_SEND_CARD_TYPES(state,cardType){
    state.sendCardTypes = cardType;
     console.log("mutations:", cardType);
  },

};

const actions = {
  // testAxios() {
  //   axios.post("/user/verification",this.user)
  //         .then(res=>{  
  //           console.log("response verification!",res);
  //           // const data = res.data;
  //           console.log(res.data);
  //           console.log("success sign up, please login");
              
  //           // console.log(user);    
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  // },

  // getAllCardType({commit}){
  //   axios.get("/card/card")
  //   .then(res =>{
  //     console.log("get all cards types", res.data);
  //     commit("SET_SEND_CARD_TYPES",res.data);
  //   })
  //   .catch(error =>{
  //     console.log(error);
  //   });
  // },
  setAllCardType({commit},cardType){
    // console.log("card.js : !!!!", cardType);
    commit("SET_SEND_CARD_TYPES",cardType);
  },

};

const getters = {
  getAllCardTypeFromState: state =>{
    return state.sendCardTypes;
  },
};

export default {

  state,
  mutations,
  actions,
  getters,
  
};
