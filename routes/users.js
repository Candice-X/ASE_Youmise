const models = require('../models');
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

router.post('/', async (req, res) => {
  const raw = await models.User.create({
    username: req.body.username,
    email: req.body.email,
  });

  const result = raw.get({ plain: true });
  // console.log(result);

  const params = {
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
    } else {
      console.log(data);
    }
  });

  res.send('ok');
});

module.exports = router;
