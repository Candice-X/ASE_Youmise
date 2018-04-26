const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const models = require('./../../models');
const recordController = require('./../../routes/records/controller');

const {cards, populateCards, users, populateUsers, records, populateRecords, messages, populateMessages} = require('./../seed/seed');


beforeEach(populateCards);
beforeEach(populateUsers);
beforeEach(populateRecords);
beforeEach(populateMessages);

describe('Use card', ()=>{
  it('should update record status and send a message to friend - unit test', async ()=>{
    let before = await models.Message.findAll({ where: {receiverid: users[0].uid} });
    // Record[0]: users[0]->users[1]
    // Message: users[1]->users[0]
    const title = 'Dinner Invitation';
    const msgContent = 'This is a invitation sent by yinghai.';
    const friendship = await recordController.dbUseCard(models.Card, models.User, models.Message, models.Record, records[0].recordid, title, msgContent);
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


describe('unit POST /record/record', ()=>{
  it('should create a new record', async ()=>{
      const record = await recordController.dbCreateRecord(models.Record, models.User, records[2].senderid, users[3].email, records[2].cardid, null, records[0].cardContent, records[0].cardTitle);
      expect(record.cardTitle).toBe(records[0].cardTitle);
      expect(record.receiverid).toBe(users[3].uid);
  });
});


describe('unit GET /record/record', ()=>{
  it('should get all records', async ()=>{
      const records = await recordController.dbFetchAll(models.Record, models.User, models.Card);
      expect(records.length).toBe(2);
      expect(records[0].senderName).toBeTruthy();
      expect(records[0].senderURL).toBeTruthy();    
  });
});

describe('unit GET /record/:id', ()=>{
  it('should return record', async ()=>{
      const res = await recordController.dbFindById(models.Record, models.User, models.Card, records[0].recordid);
      expect(res.senderName).toBe(users[0].username);
  });
});

describe('unit GET /record/record/sender/senderid', ()=>{
  it('should get all records', async ()=>{
    const res = await recordController.dbFindBySender(models.Record, models.User, models.Card, records[0].senderid, null)
    expect(res[0].senderName).toBe(users[0].username);
    expect(res[0].senderURL).toBeTruthy();
  });
});

describe('unit GET /record/record/sender/senderid/status', ()=>{
  it('should get all records', async ()=>{
    const res = await recordController.dbFindBySender(models.Record, models.User, models.Card, records[0].senderid, 1)
    expect(res[0].senderName).toBe(users[0].username);
    expect(res[0].senderURL).toBeTruthy();
  });
});

describe('unit GET /record/record/receiver/receiverid', ()=>{
  it('should get all records',  async ()=>{
    const res = await recordController.dbFindByReceiver(models.Record, models.User, models.Card, records[0].receiverid, null)
    expect(res[0].receiverName).toBe(users[1].username);
    expect(res[0].receiverURL).toBeTruthy();
  });
});

describe('unit GET /record/record/sender/receiverid/status', ()=>{
  it('should get all records',  async ()=>{
    const res = await recordController.dbFindByReceiver(models.Record, models.User, models.Card, records[0].receiverid, 1)
    expect(res[0].receiverName).toBe(users[1].username);
    expect(res[0].receiverURL).toBeTruthy();
  });
});

describe('unit GET /record/record/sender/senderid/friend/friendid', ()=>{
  it('should get all records', async ()=>{
    const res = await recordController.dbFindBySenderAndFriend (models.Record, models.User, models.Card, users[0].uid, users[1].uid)
    expect(res[0].receiverName).toBe(users[1].username);
    expect(res[0].receiverURL).toBeTruthy();  
  });
});

describe('unit GET /record/record/receiver/receiverid/friend/friendid', ()=>{
  it('should get all records', async ()=>{
    const res = await recordController.dbFindByReceiverAndFriend(models.Record, models.User, models.Card, users[1].uid, users[0].uid)
    expect(res[0].senderName).toBe(users[0].username);
    expect(res[0].receiverURL).toBeTruthy();    
  });
});

describe('DELETE /record/:id', ()=>{
  it('should remove a record', async ()=>{
    const res = await recordController.dbDeleteById(models.Record, records[0].recordid)
    expect(res.recordid).toBe(records[0].recordid);
    const find = await models.Record.findAll({ where: { recordid: records[0].recordid }, raw : true });
    expect(find.length).toBe(0);
  });
});

describe('PATCH /record/:id',()=>{
  it('should update the record', async ()=>{
    const res = await recordController.dbUpdateById(models.Record, records[0].recordid, users[5].uid, 2);
    expect(res.cardTitle).toBe(records[0].cardTitle);
    expect(res.receiverid).toBe(users[5].uid);
    expect(res.status).toBe(2);
  });
});
