// import { LexModelBuildingService } from 'aws-sdk';

const express = require('express');
const AWS = require('aws-sdk');
const moment = require('moment');
const controller = require('./controller');
const models = require('../../models');
const messageController = require('./../messages/controller');
// Add foreign key to records.

const config = require('../../config');

const router = express.Router();

// Create Record
router.post('/record', async (req, res) => {
  try {
    const result = await controller.dbCreateRecord(models.Record, models.User, req.body.senderid, req.body.receiverEmail, req.body.cardid, req.body.expireDate, req.body.cardContent, req.body.cardTitle);
    const sender = await models.User.findAll({where: {uid: req.body.senderid}, raw: true});
    const card = await models.Card.findAll({where: {cardid: req.body.cardid}, raw: true});
    let receiverid = null;
    if(req.body.receiverEmail !== null){
      const receiver = await models.User.findAll({where: {email: req.body.receiverEmail}, raw: true});
      receiverid = receiver[0].uid;
    }
    if (receiverid !== null) {
      // If receiverid == null, then unknown receiver, donot sent message to receiver.
      // We should sent message when receiverid being updated.
      // record message
      console.log(`${sender[0].username}`);
      console.log(`${card[0].cardName}`);
      const title = sender[0].username + ' send ' + req.body.receiverEmail + ' a ' + card[0].cardName + '.';
      console.log(`${title}`);
      const d = new Date();
      var time = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
d.getHours() + ":" + d.getMinutes();
      const msgContent = sender[0].username + " send a card { " + card[0].cardName + " } to " + req.body.receiverEmail + " at " + time + ".";
      
      console.log(`${msgContent}`);
      const message = await messageController.dbCreateMessage(models.Message, req.body.senderid, receiverid, result.recordid, title, msgContent);
      console.log(`message sent successs`);
    }

    res.json(result);
  } catch (err) {
    if (err.statusCode){
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(400).send();
    }

  }

});
// Fetch all records by administrator
router.get('/record', async(req, res) => {
  try {
    let result = await controller.dbFetchAll(models.Record, models.User, models.Card);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch records by senderid and status
router.get('/record/sender/:id/:status', async(req, res) => {
  try {
    const senderid = req.params.id;
    const status = req.params.status;
    let result = await controller.dbFindBySender(models.Record,models.User, models.Card, senderid, status);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});
// Fetch all records by senderid
router.get('/record/sender/:id', async(req, res) => {
  try {
    const senderid = req.params.id;
    let result = await controller.dbFindBySender(models.Record,models.User, models.Card, senderid, null);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch all records between senderid and friendid
router.get('/record/sender/:id/friend/:friendid', async(req, res) => {
  try {
    const senderid = req.params.id;
    const receiverid = req.params.friendid
    let result = await controller.dbFindBySenderAndFriend(models.Record,models.User, models.Card, senderid, receiverid);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch all records by receiverid
router.get('/record/receiver/:id', async(req, res) => {
  try {
    const receiverid = req.params.id;
    let result = await controller.dbFindByReceiver(models.Record,models.User, models.Card, receiverid, null);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch all records between receiverid and friendid
router.get('/record/receiver/:id/friend/:friendid', async(req, res) => {
  try {
    const receiverid = req.params.id;
    const senderid = req.params.friendid
    let result = await controller.dbFindByReceiverAndFriend(models.Record,models.User, models.Card, receiverid, senderid);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// Fetch records by receiverid and status
router.get('/record/receiver/:id/:status', async(req, res) => {
  try {
    const receiverid = req.params.id;
    const status = req.params.status;
    let result = await controller.dbFindByReceiver(models.Record,models.User, models.Card, receiverid, status);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch records by recordid
router.get('/record/:id', async(req, res) => {
    try {
        const recordid = req.params.id;
        let result = await controller.dbFindById(models.Record,models.User, models.Card, recordid);
        if(result.length === 0){
          res.status(err.statusCode).send();
        }
        res.json(result);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });


// Fetch records by recordid
router.patch('/record/:id', async(req, res) => {
    try {
        const recordid = req.params.id;
        const updates = req.body;
        let record = await models.Record.findAll({ where: { recordid: recordid }, raw: true });
        if (record.length === 0){
          res.status(400).send();
        }
        let result = await controller.dbUpdateById(models.Record, recordid, updates.receiverid, updates.status);
        let receiverid = null;
        if(updates.receiverid !== null){ 
          if (req.body.title === null || req.body.msgContent === null){
            res.status(400).send("need to update message, wilhe title or msgContent is null");
          }
          // We should sent message when receiverid being updated.
          const message = await messageController.dbCreateMessage(models.Message, result.senderid, updates.receiverid, result.recordid, req.body.title, req.body.msgContent);
          console.log(`message sent successs`);
        }
        res.json(result);

    } catch (err) {
      res.status(400).send(err.message);
    }
  });

router.delete('/record/:id', async(req, res) => {
  try {
      const recordid = req.params.id;
      let result = await controller.dbDeleteById(models.Record, recordid);
      if (result.length === 0){
        res.status(400).send();
      }
      res.json(result);
  } catch (err) {
      res.status(400).send(err.message);
  }
});

router.post('/usecard', async (req, res) => {
  try {
    const result = await controller.dbUseCard(models.Message, models.Record, req.body.recordid, req.body.title, req.body.msgContent);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

router.post('/usecardreply', async (req, res) => {
  try {
    const result = await controller.dbUseCardReply(models.Message, models.Record, req.body.recordid, req.body.recordstatus, req.body.title, req.body.msgContent);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

module.exports = router;
