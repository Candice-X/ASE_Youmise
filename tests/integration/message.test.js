const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const {app} = require('./../../app');
const models = require('./../../models');


const {cards, populateCards, users, populateUsers, records, populateRecords, messages, populateMessages } = require('./../seed/seed');

beforeEach(populateCards);
beforeEach(populateUsers);
beforeEach(populateRecords);
beforeEach(populateMessages);

describe('POST /message/message ', ()=>{
    it('should create a new message', (done)=>{
        request(app)
            .post('/message/message')
            .send({
                senderid: messages[2].senderid,
                receiverid: messages[2].receiverid,
                recordid: messages[2].recordid,
                status: 1,
                title: messages[2].title,
                msgContent: messages[2].msgContent
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.title).toBe("Drink invitation");
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Message.findAll({ where: { title: messages[2].title }, raw : true }).then((message)=>{
                    expect(message.length).toBe(1);
                    expect(message[0].title).toBe("Drink invitation");
                    done();
                }).catch((e)=> done(e));
            });
    });
    it('should not create message with invalid data',(done)=>{
        request(app)
            .post('/message/message')
            .send()
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                models.Message.findAll({ raw: true }).then((res)=>{
                    expect(res.length).toBe(2);
                    done();
                }).catch((e)=> done(e));
            });
    }); 
});

describe('GET /message/message', ()=>{
    it('should get all messages', (done)=>{
        request(app)
            .get('/message/message')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(2);
                expect(res.body[0].cardTitle).toBeTruthy();
                expect(res.body[0].cardtype).toBeTruthy();
            })
            .end(done);
    })
})

describe('GET /message/message/sender/senderid', ()=>{
    it('should get all messages by sender', (done)=>{
        request(app)
            .get(`/message/message/sender/${messages[0].senderid}`)
            .expect(200)
            .expect((res)=>{
                console.log(`this is the response ${res.body}`);
                expect(res.body.length).toBe(1);
                expect(res.body[0].recordid).toBe(records[0].recordid);
            })
            .end(done);
    })
})

describe('GET /message/message/sender/senderid/friend/friendid', ()=>{
    it('should get all messages', (done)=>{
        request(app)
            .get(`/message/message/sender/${messages[0].senderid}/friend/${messages[0].receiverid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
                expect(res.body[0].title).toBe(messages[0].title);
            })
            .end(done);
    })
})

describe('GET /message/message/receiver/receiverid/friend/friendid', ()=>{
    it('should get all messages', (done)=>{
        request(app)
            .get(`/message/message/receiver/${messages[0].receiverid}/friend/${messages[0].senderid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
                expect(res.body[0].cardtype).toBe(cards[0].types);
            })
            .end(done);
    })
})
describe('GET /message/message/sender/senderid/status', ()=>{
    it('should get all messages', (done)=>{
        request(app)
            .get(`/message/message/sender/${messages[0].senderid}/${messages[0].status}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
            })
            .end(done);
    })
})

describe('GET /message/message/receiver/receiverid', ()=>{
    it('should get all messages', (done)=>{
        request(app)
            .get(`/message/message/receiver/${messages[0].receiverid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
            })
            .end(done);
    })
})

describe('GET /message/message/receiver/receiverid/status', ()=>{
    it('should get all messages', (done)=>{
        request(app)
            .get(`/message/message/receiver/${messages[0].receiverid}/${messages[0].status}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
            })
            .end(done);
    })
})

describe('GET /message/:id',()=>{
    it('should return message',(done)=>{
        request(app)
            .get(`/message/message/${messages[0].messageid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.title).toBe(messages[0].title);
                expect(res.body.cardtype).toBeTruthy();
            })
            .end(done);
    });
    it('should return 400 for non-object ids',(done)=>{
        var wrongId = "abcd3";
        request(app)
            .get(`/message/message/${wrongId}`)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /message/:id', ()=>{
    it('should remove a message',(done)=>{
        request(app)
            .delete(`/message/message/${messages[0].messageid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.recordid).toBe(messages[0].recordid);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Message.findAll({ where: { messageid: messages[0].messageid }, raw : true }).then((message)=>{
                    expect(message.length).toBe(0);
                    done();
                }).catch((e)=>done(e));  
            });
    });
    it('should return 400 if message not found', (done)=>{
        var wrongId = "abcd3";
        request(app)
            .delete(`/message/message/${wrongId}`)
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

describe('PATCH /message/:id',()=>{
    it('should update the message', (done)=>{
        request(app)
            .patch(`/message/message/${messages[0].messageid}`)
            .send({
                senderid: null,
                receiverid: null,
                recordid: null,
                status: 5,
                title: null,
                msgContent: null
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.title).toBe(messages[0].title);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Message.findAll({ where: { messageid: messages[0].messageid }, raw : true }).then((res)=>{
                    console.log(`find result update ${JSON.stringify(res[0])}`);
                    expect(res[0].status).toBe(5);
                    done();
                }).catch((e)=>done(e));  
            });
    });
});
