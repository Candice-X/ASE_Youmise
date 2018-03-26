const express = require('express');
const AWS = require('aws-sdk');

const controller = require('./controller');
const models = require('../../models');
// Add foreign key to records.
// models.Records.belongsTo(models.Users, {foreignKey: 'userid'});
// models.Records.belongsTo(models.Cards, {foreignKey: 'cardid'});
const config = require('../../config');

const router = express.Router();

// Create Record
router.post('/record', async (req, res) => {
  try {
    const result = await controller.dbCreateRecord(models.Record, req.body.senderid, req.body.receiverid, req.body.cardid, req.body.expireDate, req.body.cardContent, req.body.cardTitle);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }

});
// Fetch records by senderid and status
router.get('/record/:id/:status', async(req, res) => {
  try {
    const senderid = req.params.id;
    const status = req.params.status;
    let result = await controller.dbFindBySender(models.Record, senderid, status);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});
// Fetch records by recordid
router.get('/record/:id', async(req, res) => {
    try {
        const recordid = req.params.id;
        let result = await controller.dbFindById(models.Record, recordid);
        res.json(result);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });

// Fetch records by recordid
router.patch('/record/:id', async(req, res) => {
    try {
        const recordid = req.params.id;
        const {updates} = req.body;
        let record = await models.Record.findOne({ where: { recordid: recordid } });
        let result = await controller.dbUpdateById(record, recordid, updates.receiverid, updates.status);
        res.json(result);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });

router.delete('/record/:id', async(req, res) => {
try {
    const recordid = req.params.id;
    let result = await controller.dbDeleteById(models.Record, recordid);
    res.json(result);
} catch (err) {
    res.status(err.statusCode).send(err.message);
}
});

module.exports = router;
