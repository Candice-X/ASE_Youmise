// import { LexModelBuildingService } from 'aws-sdk';

const express = require('express');
const AWS = require('aws-sdk');

const controller = require('./controller');
const models = require('../../models');
// Add foreign key to records.

const config = require('../../config');

const router = express.Router();

// Create Message
router.post('/message', async (req, res) => {
  try {
    const result = await controller.dbCreateMessage(models.Message, req.body.senderid, req.body.receiverid, req.body.recordid, req.body.title, req.body.msgContent);
    
    res.json(result);
  } catch (err) {
    if (err.statusCode){
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(400).send();
    }
    
  }

});
// Fetch all messages by administrator
router.get('/message', async(req, res) => {
  try {
    let result = await controller.dbFetchAll(models.Message, models.Record, models.Card);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch messages by senderid and status
router.get('/message/sender/:id/:status', async(req, res) => {
  try {
    const senderid = req.params.id;
    const status = req.params.status;
    let result = await controller.dbFindBySender(models.Message, models.Record, models.Card, senderid, status);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});
// Fetch all messages by senderid
router.get('/message/sender/:id', async(req, res) => {
  try {
    const senderid = req.params.id;
    let result = await controller.dbFindBySender(models.Message, models.Record, models.Card, senderid, null);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch all messages between senderid and friendid
router.get('/message/sender/:id/friend/:friendid', async(req, res) => {
  try {
    const senderid = req.params.id;
    const receiverid = req.params.friendid
    let result = await controller.dbFindBySenderAndFriend(models.Message, models.Record, models.Card, senderid, receiverid);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch all messages by receiverid
router.get('/message/receiver/:id', async(req, res) => {
  try {
    const receiverid = req.params.id;
    let result = await controller.dbFindByReceiver(models.Message, models.Record, models.Card, receiverid, null);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch all messages between receiverid and friendid
router.get('/message/receiver/:id/friend/:friendid', async(req, res) => {
  try {
    const receiverid = req.params.id;
    const senderid = req.params.friendid
    let result = await controller.dbFindByReceiverAndFriend(models.Message, models.Record, models.Card, receiverid, senderid);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// Fetch messages by receiverid and status
router.get('/message/receiver/:id/:status', async(req, res) => {
  try {
    const receiverid = req.params.id;
    const status = req.params.status;
    let result = await controller.dbFindByReceiver(models.Message, models.Record, models.Card, receiverid, status);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Fetch message by messageid
router.get('/message/:id', async(req, res) => {
    try {
        const messageid = req.params.id;
        let result = await controller.dbFindById(models.Message, models.Record, models.Card, messageid);
        if(result.length === 0){
          res.status(err.statusCode).send();
        }
        res.json(result);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });


// Update messages by messageid
router.patch('/message/:id', async(req, res) => {
    try {
        const messageid = req.params.id;
        const updates = req.body;
        let message = await models.Message.findAll({ where: { messageid: messageid }, raw: true });
        if (message.length === 0){
          res.status(400).send();
        }
        let result = await controller.dbUpdateById(models.Message, messageid, updates.status);
        res.json(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  // Delete message by messageid
router.delete('/message/:id', async(req, res) => {
  try {
      const messageid = req.params.id;
      let result = await controller.dbDeleteById(models.Message, messageid);
      if (result.length === 0){
        res.status(400).send();
      }
      res.json(result);
  } catch (err) {
      res.status(400).send(err.message);
  }
  });
  
module.exports = router;
