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
    let result = await controller.dbFetchAll(models.Message, models.Record);
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
module.exports = router;
