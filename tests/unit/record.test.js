const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const models = require('./../../models');
const recordController = require('./../../routes/records/controller');

const {cards, populateCards, users, populateUsers, records, populateRecords, messages, populateMessages} = require('./../seed/seed');

beforeEach(populateCards);
beforeEach(populateRecords);
beforeEach(populateMessages);

describe('Use card', ()=>{
  it('should update record status and send a message to friend - unit test', async ()=>{
    let before = await models.Message.findAll({ where: {receiverid: users[0].uid} });
    // Record[0]: users[0]->users[1]
    // Message: users[1]->users[0]
    const title = 'Dinner Invitation';
    const msgContent = 'This is a invitation sent by yinghai.';
    const friendship = await recordController.dbUseCard(models.Message, models.Record, records[0].recordid, title, msgContent);
    let after = await models.Message.findAll({ where: {receiverid: users[0].uid }});
    const record = await models.Record.findOne({ where: {recordid: records[0].recordid}});
    expect(after.length).toBe(before.length + 1);
    expect(record.status).toBe(6);
  });
});

describe('Reply card', ()=>{
  it('should update record status and send a message to friend - unit test', async ()=>{
    let before = await models.Message.findAll({ where: {senderid: users[0].uid} });
    // Record[0]: users[0]->users[1]
    // Message: users[1]->users[0]
    const recordstatus = 5;
    const title = 'Dinner Invitation';
    const msgContent = 'This is a invitation sent by yinghai.';
    const friendship = await recordController.dbUseCardReply(models.Message, models.Record, records[0].recordid, recordstatus, title, msgContent);
    let after = await models.Message.findAll({ where: {senderid: users[0].uid }});
    const record = await models.Record.findOne({ where: {recordid: records[0].recordid}});
    expect(after.length).toBe(before.length + 1);
    expect(record.status).toBe(5);
  });
});
//  //run before every test case

// describe('POST /card', ()=>{
//     it('should create a new card', (done)=>{
//         var note = 'Note test 3';
//         request(app)
//             .post('/card/card')
//             .send({
//                 types: cards[2].types,
//                 cardName: cards[2].cardName,
//                 cardImgURL: cards[2].cardImgURL,
//                 cardNote: cards[2].cardNote
//             })
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.cardNote).toBe(cards[2].cardNote);
//             })
//             .end((err,res)=>{
//                 if(err){
//                     return done(err);
//                 }
//                 models.Card.findAll({ where: { cardNote: note }, raw : true }).then((card)=>{
//                     expect(card.length).toBe(1);
//                     expect(card[0].cardNote).toBe(note);
//                     done();
//                 }).catch((e)=> done(e));
//             });
//     });
//     it('should not create card with invalid data',(done)=>{
//         request(app)
//             .post('/card/card')
//             .send()
//             .expect(400)
//             .end((err, res)=>{
//                 if(err){
//                     return done(err);
//                 }
//                 models.Card.findAll({ raw: true }).then((res)=>{
//                     expect(res.length).toBe(2);
//                     done();
//                 }).catch((e)=> done(e));
//             });
//     });
// });

// describe('GET /card', ()=>{
//     it('should get all cards', (done)=>{
//         request(app)
//             .get('/card/card')
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.length).toBe(2);
//             })
//             .end(done);
//     })
// })

// describe('GET /card/:id',()=>{
//     it('should return card',(done)=>{
//         request(app)
//             .get(`/card/card/${cards[0].cardid}`)
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.cardNote).toBe(cards[0].cardNote);
//             })
//             .end(done);
//     });
//     it('should return 400 for non-object ids',(done)=>{
//         var wrongId = "abcd3";
//         request(app)
//             .get(`/card/card/${wrongId}`)
//             .expect(400)
//             .end(done);
//     });
// });

// describe('DELETE /card/:id', ()=>{
//     it('should remove a card',(done)=>{
//         request(app)
//             .delete(`/card/card/${cards[0].cardid}`)
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.cardid).toBe(cards[0].cardid);
//             })
//             .end((err,res)=>{
//                 if(err){
//                     return done(err);
//                 }
//                 models.Card.findAll({ where: { cardid: cards[0].cardid }, raw : true }).then((card)=>{
//                     expect(card.length).toBe(0);
//                     done();
//                 }).catch((e)=>done(e));
//             });
//     });
//     it('should return 400 if card not found', (done)=>{
//         var wrongId = "abcd3";
//         request(app)
//             .delete(`/card/card/${wrongId}`)
//             .expect(400)
//             .end(done);
//     });
// //     it('should return 404 if id is invalid',(done)=>{
// //         request(app)
// //         .delete('/todos/123abc')
// //         .set('x-auth', users[1].tokens[0].token)
// //         .expect(404)
// //         .end(done);
// //     });
// });

// describe('PATCH /card/:id',()=>{
//     it('should update the card', (done)=>{
//         var cardid = cards[0].cardid;
//         var text = cards[0].cardNote;
//         request(app)
//             .patch(`/card/card/${cardid}`)
//             .send({
//                 cardName : null,
//                 cardImgURL: null,
//                 cardNote: "Change note"
//             })
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.cardNote).toBe("Change note");
//             })
//             .end((err,res)=>{
//                 if(err){
//                     return done(err);
//                 }
//                 models.Card.findAll({ where: { cardid: cardid }, raw : true }).then((card)=>{
//                     expect(card[0].cardName).toBeTruthy();
//                     done();
//                 }).catch((e)=>done(e));
//             });
//     });
// });
