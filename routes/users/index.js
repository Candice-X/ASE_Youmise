const express = require('express');
const AWS = require('aws-sdk');

const controller = require('./controller');
const models = require('../../models');
const config = require('../../config');
var {authenticate} = require('./../../middleware/authenticate');


const router = express.Router();
AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
 });

const s3= new AWS.S3();

const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

router.post('/signup', async (req, res) => {
  try {
    const result = await controller.signup(models.User, cognito, req.body.username, req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }

});

router.post('/facebooklogin', async (req, res) => {
  try {
    if (req.body.facebookid === null){
      res.status(400).send("facebook userid is empty");
    } else {
      const result = await controller.dbFacebookLogin(models.User, req.body.facebookid, req.body.username, req.body.email);
      res.json(result);
    }
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }

});

router.post('/verification', async(req, res) => {
  try {
    const username = await controller.verification(cognito, req.body.confirmationCode, req.body.username);
    res.json(username);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }

});

router.post('/resendConfirmation', async(req, res) => {
  try {
    let username = req.body.username;
    if(typeof(username) === 'undefined'){
      username = await controller.getUsernameFromEmail(models.User, req.body.email);
    }
    const result = await controller.resendConfirmation(cognito, username);
    // console.log(result);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

router.post('/forgetPassword', async(req, res) => {
  try {
    let username = req.body.username;
    if(typeof(username) === 'undefined'){
      username = await controller.getUsernameFromEmail(models.User, req.body.email);
    }
    const result = await controller.forgetPassword(cognito, username);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

router.post('/confirmforgetPassword', async(req, res) => {
  try {
    const username = await controller.confirmforgetPassword(cognito, req.body.confirmationCode, req.body.password, req.body.username);
    res.json(username);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

router.post('/addAvatar', async(req, res) => {
  try {
    const avatar = await controller.addAvatar(models.User, s3, req.body.uid, req.body.avatar);
    res.json(avatar);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/user', async(req, res) => {
  try {
    let result = await controller.dbFetchAll(models.User);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/unauth/user', async(req, res) => {
  try {
    let result = await controller.dbFetchAll(models.User);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/user', async(req, res) => {
  try {
    let result = await controller.dbFetchAll(models.User);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/avatar/:uid', async(req, res) => {
  try {
    const uid = req.params.uid;
    const result = await controller.getUserAvatar(models.User, uid);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
})


router.patch('/unauth/user/:uid', async(req, res) => {
  try {
    const uid = req.params.uid;
    const username = req.body.username;
    const avatarUrl = req.body.avatarUrl;
    const result = await controller.dbUpdateId(models.User, uid, username, avatarUrl);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
})

router.patch('/user/:uid', authenticate, async(req, res) => {
  try {
    const uid = req.params.uid;
    const username = req.body.username;
    const avatarUrl = req.body.avatarUrl;
    const result = await controller.dbUpdateId(models.User, uid, username, avatarUrl);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
})

router.get('/user/auth', authenticate, async(req, res) => {
  try {
    let result = await controller.dbFetchAll(models.User);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = router;
