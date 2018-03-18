const models = require('../models');
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

router.post('/signup', async (req, res) => {
  let result;
  try{
    let raw = await models.User.create({
      username: req.body.username,
      email: req.body.email,
    });
    result = raw.get({ plain: true });
  } catch (err) {
    const message = err.errors.reduce((prev, { message }) => {
      return `${prev}${message}; `;
    }, '');
    return res.status(400).send(message);
  }

  let params = {
    ClientId: process.env.CLIENT_ID,
    Password: req.body.password,
    Username: result.username,
    UserAttributes: [
      {
        Name: 'custom:uid',
        Value: result.uid
      },
      {
        Name: 'email',
        Value: result.email
      }
    ]
  };

  cognito.signUp(params, async(err, data) => {
    if (err) {
      console.error(err);
      await models.User.destroy({
        where: { uid: result.uid }
      });
      models.User.findAll().then(users => {
          console.log(users)
      })
      res.status(400).send(err.message);
    } else {
      console.log(data);
      res.json({ username: result.username });
    }
  });


});

router.post('/verification', async(req, res) => {
  let params = {
    ClientId: process.env.CLIENT_ID,
    ConfirmationCode: req.body.confirmationCode,
    Username: req.body.username,
  };

  cognito.confirmSignUp(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      res.status(400).send(err.message);
    }
    else {
      console.log(data);
      res.send("ok!");
    }
  });
});

module.exports = router;
