const express = require('express');
const AWS = require('aws-sdk');

const models = require('../../models');
const config = require('../../config');
var {authenticate} = require('./../../middleware/authenticate');

const router = express.Router();

router.get('/auth', authenticate, async (req, res) => {
  try {
    console.log('authenticate successfully');
    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;