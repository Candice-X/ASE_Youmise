const express = require('express');

const controller = require('./controller');
const models = require('../../models');
const config = require('../../config');

const router = express.Router();

router.post('/sendFriendRequest', async (req, res) => {
  try {
    const result = await controller.sendFriendRequest(models.User, models.Friendship, models.FriendRequest, req.body.senderId, req.body.receiverEmail);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

router.post('/updateFriendRequest', async (req, res) => {
  try {
    const result = await controller.updateFriendRequest(models.User, models.Friendship, models.FriendRequest, req.body.friendRequestId, req.body.status);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

router.get('/listFriendRequest/:uid', async (req, res) => {
  try {
    const receiverId = req.params.uid;
    const result = await controller.listFriendRequest(models.User, models.FriendRequest, receiverId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
  }
});

router.get('/listFriends/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    const result = await controller.listFriends(models.User, models.Friendship, userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
  }
});

router.delete('/deleteFriends/:uid1/:uid2', async(req, res) => {
try {
    const user1 = req.params.uid1;
    const user2 = req.params.uid2;
    const result = await controller.deleteFriends(models.User, models.Friendship, user1, user2);
    res.json(result);
} catch (err) {
    res.status(400).send(err.message);
}
});

module.exports = router;
