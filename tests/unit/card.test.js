const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const models = require('./../../models');
const controller = require('./../../routes/cards/controller');

const {cards, populateCards} = require('./../seed/seed');

beforeEach(populateCards);
 //run before every test case
// after(()=>{
//   return require('../../models').sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
// });

describe('Create', ()=>{
    it('should create a new card unit test', async ()=>{
        var note = 'Note test 3';
        const card = await controller.dbCreateCard(models.Card, cards[2].types, cards[2].cardName, cards[2].cardImgURL, cards[2].cardNote);
        expect(card.cardNote).toBe(cards[2].cardNote);
    });
});

describe('GET /card', ()=>{
    it('should get all cards', async ()=>{
        const cards = await controller.dbFetchAll(models.Card);
        expect(cards.length).toBe(2);
    })
})

describe('GET /card/:id',()=>{
    it('should return card', async ()=>{
        const result = await controller.dbFindById(models.Card, cards[0].cardid);
        expect(result.cardNote).toBe(cards[0].cardNote);
    });
});

describe('DELETE /card/:id', ()=>{
    it('should remove a card', async ()=>{
        const result = await controller.dbDeleteById(models.Card, cards[0].cardid);
        expect(result.cardid).toBe(cards[0].cardid);
    });
});

describe('PATCH /card/:id',()=>{
    it('should update the card', async ()=>{
        var cardid = cards[0].cardid;
        var text = cards[0].cardNote;
        const result = await controller.dbUpdateById(models.Card, cards[0].cardid, null, null, "Change note");
        expect(result.cardNote).toBe("Change note");
    });
});
