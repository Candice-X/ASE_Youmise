const ServerError = require('../../utils/ServerError');
const config = require('../../config');
// const Card = require('./../../models/Card');
exports.dbCreateCard = async (Card, types, cardName, cardImgURL, cardNote) => {
  let result;
  try{
    const raw = await Card.create({
        types,
        cardName,
        cardImgURL,
        cardNote
    });
    result = raw.get({ plain: true });
    return result;
  } catch (err) {
    const message = err.errors.reduce((prev, { message }) => {
      return `${prev}${message}; `;
    }, '');
    throw new ServerError(400, message);
  }
};
exports.dbFetchAll = async (Card) => {
  try {
    const result = await Card.findAll({ raw: true });
      if (!result){
        console.log('There is no record in Card Table.');
      } else {
          console.log('Successfully find all cards.');
          console.log(JSON.stringify(result));
          return result;
      }
  } catch (err) {
    // const message = err.errors.reduce((prev, { message }) => {
    //     return `${prev}${message}; `;
    //   }, '');
    throw new ServerError(400, err);
  }
};

exports.dbFindById = async (Card, cardid) => {
  try {
    if (cardid.length != 36){
      throw new ServerError(400, message);
    }
    const card = await Card.findAll({ where: { cardid: cardid }, raw: true });
      if (!card) {
          console.log('Id not exists in db.')
      } else {
          console.log('Successfully find card.');
          return card[0];
      }
  } catch (err) {
      const message = err.errors.reduce((prev, { message }) => {
          return `${prev}${message}; `;
        }, '');
      throw new ServerError(400, message);
  }
};
exports.dbDeleteById = async (Card, cardid) => {
  try {
      let result = await Card.destroy({ where: {cardid : cardid} });
      console.log(`Delete successfully, ${result}`);
      return Card.findAll({});
  } catch (err) {
      const message = err.errors.reduce((prev, { message }) => {
          return `${prev}${message}; `;
          }, '');
      throw new ServerError(400, err.message);
  }
};

