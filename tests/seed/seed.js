const sequelize = require('sequelize');
const models = require('./../../models');
const {Card} = require('./../../routes/cards/controller');
before(function () {
    return require('../../models').sequelize.sync();
});
function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
const CardOneId = generateUUID();
const CardTwoId = generateUUID();
const CardThreeId = generateUUID();
const cards = [{
    cardid: CardOneId,
    types: 1,
    cardName: 'Lunch Invitation',
    cardImgURL: 'https://123.com',
    cardNote: "Note test 1"
},{
    cardid: CardTwoId,
    types: 2,
    cardName: 'Movie Invitation',
    cardImgURL: 'https://456.com',
    cardNote: "Note test 2"
},{
    cardid: CardThreeId,
    types: 3,
    cardName: 'Dinner Invitation',
    cardImgURL: 'https://789.com',
    cardNote: "Note test 3"
}];

const populateCards = (done)=>{
    models.Card.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        const cardOne = models.Card.create(cards[0]).then((card)=>{
            return card;
            
    });
        const cardTwo =  models.Card.create(cards[1]).then((card)=>{
            return card;
    });
        return Promise.all([cardOne, cardTwo])
    }).then(()=> done());
}
module.exports = {cards, populateCards};

