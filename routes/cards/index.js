const express = require('express');
const AWS = require('aws-sdk');

const controller = require('./controller');
const models = require('../../models');
const config = require('../../config');

const router = express.Router();

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
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/card/:id', async(req, res) => {
    try {
      const cardid = req.params.id;
      if (cardid.length != 36){
        res.status(400).send();
      }
      let result = await controller.dbFindById(models.Card, cardid);
      res.json(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

router.delete('/card/:id', async(req, res) => {
try {
    const cardid = req.params.id;
    let result = await controller.dbDeleteById(models.Card, cardid);
    if (result.length === 0){
      res.status(400).send();
    }
    res.json(result);
} catch (err) {
    res.status(400).send(err.message);
}
});

// Fetch card by cardid
router.patch('/card/:id', async(req, res) => {
  try {
      const cardid = req.params.id;
      const updates = req.body;
      let card = await models.Card.findAll({ where: { cardid: cardid }, raw: true });
      if (card.length === 0){
        res.status(400).send();
      }
      let result = await controller.dbUpdateById(models.Card, cardid, updates.cardName, updates.cardImgURL, updates.cardNote);
      res.json(result);
  } catch (err) {
      res.status(400).send(err.message);
  }
  });


module.exports = router;
