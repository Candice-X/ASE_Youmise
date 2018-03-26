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
      let record = await Card.findAll({ where: {cardid : cardid} });
      let result = await Card.destroy({ where: {cardid : cardid} });
      // return Card.findAll({});
      return record[0];
  } catch (err) {
      const message = err.errors.reduce((prev, { message }) => {
          return `${prev}${message}; `;
          }, '');
      throw new ServerError(400, err.message);
  }
};

exports.dbUpdateById = async (Card, cardid, cardName, cardImgURL, cardNote) => {
  try {
          let card = await Card.findAll({where: {cardid: cardid}, raw: true});
          if (cardName != null){
            card[0].cardName = cardName;
          }
          if (cardImgURL != null){
            card[0].cardImgURL = cardImgURL;
          }
          if (cardNote != null){
            card[0].cardNote = cardNote;
          }
          let updateCard = await Card.findOne({cardid: card[0].cardid});
          let result = await updateCard.updateAttributes({
              cardName : card[0].cardName, 
              cardImgURL: card[0].cardImgURL,
              cardNote: card[0].cardNote
          });
          return result;
  } catch (err) {
      const message = err.errors.reduce((prev, { message }) => {
          return `${prev}${message}; `;
          }, '');
      throw new ServerError(400, err.message);
  }
};
