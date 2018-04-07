const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const {app} = require('./../../app');
const models = require('./../../models');

const {cards, populateCards} = require('./../seed/seed');

beforeEach(populateCards);
//  run before every test case
// This part is not work.. Not sure what will happen if not close connection, just keep here for now.
//  after(async ()=>{
//     await models.sequelize.connectionManager.close().then((done) =>
//     {
//         console.log('shut down gracefully');
//         // setTimeout(function() {
//         //     done();  // MAGIC == EVIL.
//         // }, 1000);
//         done();
//     });   
// });

describe('POST /card', ()=>{
    it('should create a new card', (done)=>{
        var note = 'Note test 3';
        request(app)
            .post('/card/card')
            .send({
                types: cards[2].types, 
                cardName: cards[2].cardName, 
                cardImgURL: cards[2].cardImgURL, 
                cardNote: cards[2].cardNote
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardNote).toBe(cards[2].cardNote);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Card.findAll({ where: { cardNote: note }, raw : true }).then((card)=>{
                    expect(card.length).toBe(1);
                    expect(card[0].cardNote).toBe(note);
                    done();
                }).catch((e)=> done(e));
            });
    });
    it('should not create card with invalid data',(done)=>{
        request(app)
            .post('/card/card')
            .send()
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                models.Card.findAll({ raw: true }).then((res)=>{
                    expect(res.length).toBe(2);
                    done();
                }).catch((e)=> done(e));
            });
    }); 
});

describe('GET /card', ()=>{
    it('should get all cards', (done)=>{
        request(app)
            .get('/card/card')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(2);
            })
            .end(done);
    })
})

describe('GET /card/:id',()=>{
    it('should return card',(done)=>{
        request(app)
            .get(`/card/card/${cards[0].cardid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardNote).toBe(cards[0].cardNote);
            })
            .end(done);
    });
    it('should return 400 for non-object ids',(done)=>{
        var wrongId = "abcd3";
        request(app)
            .get(`/card/card/${wrongId}`)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /card/:id', ()=>{
    it('should remove a card',(done)=>{
        request(app)
            .delete(`/card/card/${cards[0].cardid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardid).toBe(cards[0].cardid);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Card.findAll({ where: { cardid: cards[0].cardid }, raw : true }).then((card)=>{
                    expect(card.length).toBe(0);
                    done();
                }).catch((e)=>done(e));  
            });
    });
    it('should return 400 if card not found', (done)=>{
        var wrongId = "abcd3";
        request(app)
            .delete(`/card/card/${wrongId}`)
            .expect(400)
            .end(done);
    });
//     it('should return 404 if id is invalid',(done)=>{
//         request(app)
//         .delete('/todos/123abc')
//         .set('x-auth', users[1].tokens[0].token)
//         .expect(404)
//         .end(done);
//     });
});

describe('PATCH /card/:id',()=>{
    it('should update the card', (done)=>{
        var cardid = cards[0].cardid;
        var text = cards[0].cardNote;
        request(app)
            .patch(`/card/card/${cardid}`)
            .send({
                cardName : null, 
                cardImgURL: null,
                cardNote: "Change note"
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardNote).toBe("Change note");
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Card.findAll({ where: { cardid: cardid }, raw : true }).then((card)=>{
                    expect(card[0].cardName).toBeTruthy();
                    done();
                }).catch((e)=>done(e));  
            });
    });
});

