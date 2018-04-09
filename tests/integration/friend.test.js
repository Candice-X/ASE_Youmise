const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const {app} = require('./../../app');
const models = require('./../../models');

const {users, populateUsers, friendships, populateFriendships, friendRequests, populateFriendRequests} = require('./../seed/seed');

beforeEach(populateUsers);
beforeEach(populateFriendships);
beforeEach(populateFriendRequests);

after(()=>{
   return require('../../models').sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
});

describe('POST /friend/sendFriendRequest ', ()=>{
  it('should create a new friendRequest', async ()=>{
      let before = await models.FriendRequest.findAll({ raw: true });

      const res = await request(app).post('/friend/sendFriendRequest').send({
        senderId: users[1].uid,
        receiverEmail: users[2].email,
      }).expect(200);
      expect(res.body.friendRequestId).toBe(before.length+1);

      let after = await models.FriendRequest.findAll({ raw : true });
      expect(after.length).toBe(before.length+1);
  });

  it('should show an existing friendRequest',  async ()=>{
      let before = await models.FriendRequest.findAll({ raw: true });

      const res = await request(app).post('/friend/sendFriendRequest').send({
        senderId: users[2].uid,
        receiverEmail: users[3].email,
      }).expect(200);
      expect(res.body.friendRequestId).toBe(friendRequests[1].friendRequestId);

      let after = await models.FriendRequest.findAll({ raw : true });
      expect(after.length).toBe(before.length);
  });

  it('should not create a record with nonexistent user', async ()=>{
      let before = await models.FriendRequest.findAll({ raw: true });

      const res = await request(app).post('/friend/sendFriendRequest').send({
        senderId: users[4].uid,
        receiverEmail: users[5].email,
      }).expect(400);

      let after = await models.FriendRequest.findAll({ raw : true });
      expect(after.length).toBe(before.length);
  });

  it('should not create a record for user sending request to himself', async ()=>{
      let before = await models.FriendRequest.findAll({ raw: true });

      const res = await request(app).post('/friend/sendFriendRequest').send({
        senderId: users[0].uid,
        receiverEmail: users[0].email,
      }).expect(200);
      expect(res.body.message).toBe('You cannot send friend request to yourself!');

      let after = await models.FriendRequest.findAll({ raw : true });
      expect(after.length).toBe(before.length);
  });

  it('should not create a record for users who are already friends', async () => {
    let before = await models.FriendRequest.findAll({ raw: true });

    const res = await request(app).post('/friend/sendFriendRequest').send({
      senderId: users[0].uid,
      receiverEmail: users[1].email,
    }).expect(400);

    let after = await models.FriendRequest.findAll({ raw : true });
    expect(after.length).toBe(before.length);
  });
});


describe('POST /friend/updateFriendRequest ', ()=>{
  it('should update an existing friendRequest status to approve and add two friendships', async () => {
    let before = await models.Friendship.findAll({ raw: true});

    const res = await request(app).post('/friend/updateFriendRequest').send({
      friendRequestId: 2,
      status: 'APPROVED'
    }).expect(200);

    expect(res.body.friendRequestId).toBe(2);
    expect(res.body.status).toBe('APPROVED');
    let after = await models.Friendship.findAll({ raw : true });
    expect(after.length).toBe(before.length+2);
  });

  it('should not update a nonexistent friendRequest', async () => {
    let before = await models.Friendship.findAll({ raw: true });

    const res = await request(app).post('/friend/updateFriendRequest').send({
      friendRequestId: 5,
      status: 'APPROVED'
    }).expect(400);

    let after = await models.Friendship.findAll({ raw : true });
    expect(after.length).toBe(before.length);
  });

  it('should delete an existing friendRequest if rejected', async () => {
    let before = await models.FriendRequest.findAll({ raw: true});

    const res = await request(app).post('/friend/updateFriendRequest').send({
      friendRequestId: 1,
      status: 'REJECTED'
    }).expect(200);

    expect(res.body.message).toBe('You rejected the user\'s friend request!');
    let after = await models.FriendRequest.findAll({ raw : true });
    expect(after.length).toBe(before.length-1);
  });
});

describe('GET /friend/listFriendRequest/:uid', ()=>{
    it('should get all FriendRequests', async ()=>{
      const res = await request(app).get(`/friend/listFriendRequest/${users[1].uid}`).expect(200);
      expect(res.body.length).toBe(1);
    });

    it('should return error if user not exists', async()=>{
      const res = await request(app).get(`/friend/listFriendRequest/${users[4].uid}`).expect(400);
    });
})

describe('GET /friend/listFriends/:uid', ()=>{
    it('should get all Friends for user', async ()=>{
      const res = await request(app).get(`/friend/listFriends/${users[0].uid}`).expect(200);
      expect(res.body.length).toBe(1);
    });

    it('should return error if user not exists', async()=>{
      const res = await request(app).get(`/friend/listFriends/${users[4].uid}`).expect(400);
    });
})

describe('DELETE /friend/deleteFriends/:uid1/:uid2', ()=>{
    it('should remove two friendships', async()=>{
      let before = await models.Friendship.findAll({ raw: true });
      const res = await request(app).delete(`/friend/deleteFriends/${users[0].uid}/${users[1].uid}`).expect(200);
      let after = await models.Friendship.findAll({ raw : true });
      expect(after.length).toBe(before.length-2);
    });

    it('should return error if user not exists', async()=>{
      const res = await request(app).delete(`/friend/deleteFriends/${users[4].uid}/${users[5].uid}`).expect(400);
    });

    it('should return error if friendship not exists', async()=>{
      const res = await request(app).delete(`/friend/deleteFriends/${users[2].uid}/${users[3].uid}`).expect(400);
    });

});
