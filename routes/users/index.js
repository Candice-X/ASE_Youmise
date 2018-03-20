const express = require('express');
const AWS = require('aws-sdk');

const controller = require('./controller');
const models = require('../../models');
const config = require('../../config');

const router = express.Router();
AWS.config.update({ region: 'us-east-2' });

const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

router.post('/signup', async (req, res) => {
  try {
    const result = await controller.signup(models.User, cognito, req.body.username, req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }

});

router.post('/verification', async(req, res) => {
  try {
    let username = await controller.verification(cognito, req.body.confirmationCode, req.body.username);
    res.json(username);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }

});

router.post('/resendConfirmation', async(req, res) => {
  try {
    let username = await controller.resendConfirmation(models.User, cognito, req.body.email);
    // console.log(result);
    res.json(username);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

module.exports = router;
