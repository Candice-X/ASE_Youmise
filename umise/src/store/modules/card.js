const state = {
  girl: require('../../../static/girl.png'),
  boy: require('../../../static/Logo.png'),
  cards: [],
  sendCardTypes: [],
};

const mutations = {
  SET_SEND_CARD_TYPES(state, cardType) {
    state.sendCardTypes = cardType;
    console.log("mutations:", cardType);
  },

};

const actions = {
  setAllCardType({
    commit
  }, cardType) {
    // console.log("card.js : !!!!", cardType);
    commit("SET_SEND_CARD_TYPES", cardType);
  },

};

const getters = {
  getAllCardTypeFromState: state => {
    return state.sendCardTypes;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,

};
