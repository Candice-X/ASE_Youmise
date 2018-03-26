const express = require('express');
const AWS = require('aws-sdk');

const controller = require('./controller');
const models = require('../../models');
const config = require('../../config');

const router = express.Router();
// AWS.config.update({ region: 'us-east-2' });

// const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

router.post('/card', async (req, res) => {
  try {
    const result = await controller.dbCreateCard(models.Card, req.body.types, req.body.cardName, req.body.cardImgURL, req.body.cardNote);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/card', async(req, res) => {
  try {
    let result = await controller.dbFetchAll(models.Card);
    // console.log(result);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/card/:id', async(req, res) => {
    try {
      const cardid = req.params.id;
      let result = await controller.dbFindById(models.Card, cardid);
      // console.log(result);
      res.json(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

router.delete('/card/:id', async(req, res) => {
try {
    const cardid = req.params.id;
    let result = await controller.dbDeleteById(models.Card, cardid);
    res.json(result);
} catch (err) {
    res.status(400).send(err.message);
}
});
module.exports = router;
