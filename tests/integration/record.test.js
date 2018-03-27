const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const {app} = require('./../../app');
const models = require('./../../models');


const {cards, populateCards, records, populateRecords} = require('./../seed/seed');

beforeEach(populateCards);
beforeEach(populateRecords);
 //run before every test case

describe('POST /record/record 123', ()=>{
    it('should create a new record', (done)=>{
        request(app)
            .post('/record/record')
            .send({
                senderid: records[2].senderid,
                receiverid: records[2].receiverid,
                cardid: records[2].cardid,
                expireDate: null,
                cardContent: "chenfu invite xxx for dinner.",
                cardTitle: "dinner invitation",
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardTitle).toBe(records[2].cardTitle);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Record.findAll({ where: { cardTitle: records[2].cardTitle }, raw : true }).then((record)=>{
                    expect(record.length).toBe(1);
                    expect(record[0].cardTitle).toBe(records[2].cardTitle);
                    done();
                }).catch((e)=> done(e));
            });
    });
    it('should not create record with invalid data',(done)=>{
        request(app)
            .post('/record/record')
            .send()
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                models.Record.findAll({ raw: true }).then((res)=>{
                    expect(res.length).toBe(2);
                    done();
                }).catch((e)=> done(e));
            });
    }); 
});

describe('GET /record/record', ()=>{
    it('should get all records', (done)=>{
        request(app)
            .get('/record/record')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(2);
            })
            .end(done);
    })
})

describe('GET /record/record/sender/senderid', ()=>{
    it('should get all records', (done)=>{
        request(app)
            .get(`/record/record/sender/${records[0].senderid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
            })
            .end(done);
    })
})

describe('GET /record/record/sender/senderid/status', ()=>{
    it('should get all records', (done)=>{
        request(app)
            .get(`/record/record/sender/${records[0].senderid}/${records[0].status}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
            })
            .end(done);
    })
})

describe('GET /record/record/receiver/receiverid', ()=>{
    it('should get all records', (done)=>{
        request(app)
            .get(`/record/record/receiver/${records[0].receiverid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
            })
            .end(done);
    })
})

describe('GET /record/record/receiver/receiverid/status', ()=>{
    it('should get all records', (done)=>{
        request(app)
            .get(`/record/record/receiver/${records[0].receiverid}/${records[0].status}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(1);
            })
            .end(done);
    })
})
describe('GET /record/:id',()=>{
    it('should return record',(done)=>{
        request(app)
            .get(`/record/record/${records[0].recordid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardTitle).toBe(records[0].cardTitle);
            })
            .end(done);
    });
    it('should return 400 for non-object ids',(done)=>{
        var wrongId = "abcd3";
        request(app)
            .get(`/record/record/${wrongId}`)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /record/:id', ()=>{
    it('should remove a record',(done)=>{
        request(app)
            .delete(`/record/record/${records[0].recordid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.recordid).toBe(records[0].recordid);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Record.findAll({ where: { recordid: records[0].recordid }, raw : true }).then((record)=>{
                    expect(record.length).toBe(0);
                    done();
                }).catch((e)=>done(e));  
            });
    });
    it('should return 400 if card not found', (done)=>{
        var wrongId = "abcd3";
        request(app)
            .delete(`/record/record/${wrongId}`)
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

describe('PATCH /record/:id',()=>{
    it('should update the record', (done)=>{
        var recordid = records[1].recordid;
        request(app)
            .patch(`/record/record/${recordid}`)
            .send({
                senderid: null,
                receiverid: records[2].receiverid,
                cardid: null,
                expireDate: null,
                cardContent: null,
                cardTitle: null,
                status: 5
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardTitle).toBe("movie invitation");
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                models.Record.findAll({ where: { recordid: recordid }, raw : true }).then((res)=>{
                    console.log(`find result update ${JSON.stringify(res[0])}`);
                    expect(res[0].finishDate).toBeTruthy();
                    done();
                }).catch((e)=>done(e));  
            });
    });
});