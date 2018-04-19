const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const models = require('./../../models');
const messageController = require('./../../routes/messages/controller');

const {cards, populateCards, users, populateUsers, records, populateRecords, messages, populateMessages} = require('./../seed/seed');


beforeEach(populateCards);
beforeEach(populateUsers);
beforeEach(populateRecords);
beforeEach(populateMessages);

describe('unit POST /message/message ', ()=>{
    it('should create a new message', async ()=>{
        const res = await messageController.dbCreateMessage(models.Message, records[2].senderid, records[2].receiverid, records[2].recordid, messages[2].title, messages[2].msgContent);
        expect(res.title).toBe(messages[2].title);
        const message = await models.Message.findAll({ where: { title: messages[2].title }, raw : true });
        expect(message.length).toBe(1);
        expect(message[0].title).toBe(messages[2].title);
    }); 
});

describe('unit GET /message/message', ()=>{
    it('should get all messages', async ()=>{
        const res = await messageController.dbFetchAll(models.Message, models.Record, models.Card);
        expect(res.length).toBe(2);
        expect(res[0].cardTitle).toBeTruthy();
        expect(res[0].cardtype).toBeTruthy();
    });
});

describe('unit GET /message/:id',()=>{
    it('should return message', async ()=>{
        const res = await messageController.dbFindById(models.Message, models.Record, models.Card, messages[0].messageid);
        expect(res.title).toBe(messages[0].title);
        expect(res.cardtype).toBeTruthy();
    });
});

describe('unit GET /message/message/sender/senderid', ()=>{
    it('should get all messages by sender', async ()=>{
        const res = await messageController.dbFindBySender(models.Message, models.Record, models.Card, records[0].senderid, null);
        expect(res.length).toBe(1);
        expect(res[0].senderid).toBe(users[0].uid);
        expect(res[0].recordid).toBe(records[0].recordid);
    });
});

describe('unit GET /message/message/sender/senderid/status', ()=>{
    it('should get all messages by sender', async ()=>{
        const res = await messageController.dbFindBySender(models.Message, models.Record, models.Card, records[0].senderid, 1);
        expect(res.length).toBe(1);
        expect(res[0].senderid).toBe(users[0].uid);
        expect(res[0].recordid).toBe(records[0].recordid);
    });
});

describe('unit GET /message/message/receiver/receiverid', ()=>{
    it('should get all messages', async ()=>{
        const res = await messageController.dbFindByReceiver(models.Message, models.Record, models.Card, messages[0].receiverid, null);
        expect(res.length).toBe(1);
        expect(res[0].receiverid).toBe(users[1].uid);
        expect(res[0].recordid).toBe(records[0].recordid);
    });
});

describe('unit GET /message/message/receiver/receiverid/status', ()=>{
    it('should get all messages', async ()=>{
        const res = await messageController.dbFindByReceiver(models.Message, models.Record, models.Card, messages[0].receiverid, 1);
        expect(res.length).toBe(1);
        expect(res[0].receiverid).toBe(users[1].uid);
        expect(res[0].recordid).toBe(records[0].recordid);
    });
});

describe('unit GET /message/message/sender/senderid/friend/friendid', ()=>{
    it('should get all messages', async ()=>{
        const res = await messageController.dbFindBySenderAndFriend(models.Message, models.Record, models.Card, records[0].senderid, users[1].uid);
        expect(res.length).toBe(1);
        expect(res[0].receiverid).toBe(users[1].uid);
        expect(res[0].title).toBe(messages[0].title);
        expect(res[0].cardtype).toBe(cards[0].types);
    });
});

describe('unit GET /message/message/receiver/receiverid/friend/friendid', ()=>{
    it('should get all messages', async ()=>{
        const res = await messageController.dbFindByReceiverAndFriend(models.Message, models.Record, models.Card, records[0].receiverid, users[0].uid);
        expect(res.length).toBe(1);
        expect(res[0].receiverid).toBe(users[1].uid);
        expect(res[0].title).toBe(messages[0].title);
        expect(res[0].cardtype).toBe(cards[0].types);
    });
});

describe('unit DELETE /message/:id', ()=>{
    it('should remove a message', async ()=>{
        const res = await messageController.dbDeleteById(models.Message, messages[0].messageid)
        expect(res.recordid).toBe(messages[0].recordid);
        const find = await models.Message.findAll({ where: { messageid: messages[0].messageid }, raw : true });
        expect(find.length).toBe(0);
    });
});

describe('unit PATCH /message/:id',()=>{
    it('should update the message',  async ()=>{
        const res = await messageController.dbUpdateById(models.Message, messages[0].messageid, 2);
        expect(res.title).toBe(messages[0].title);
        const message = await models.Message.findAll({ where: { messageid: messages[0].messageid }, raw : true });
        expect(message[0].status).toBe(2);
    });
});