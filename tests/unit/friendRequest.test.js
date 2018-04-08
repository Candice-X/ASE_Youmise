const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const models = require('./../../models');
const controller = require('./../../routes/friends/controller');


const {users, populateUsers, friendRequests, populateFriendRequests} = require('./../seed/seed');


 //run before every test case
 after(()=>{
    return require('../../models').sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
});

beforeEach(populateUsers);
beforeEach(populateFriendRequests);

describe('create', ()=>{
  it('should create a new friendRequest unit test', async ()=>{
    let Before = await models.FriendRequest.findAll({ raw : true });
    const friendRequest = await controller.sendFriendRequest(models.User, models.Friendship, models.FriendRequest, users[1].uid, users[2].email);
    let After = await models.FriendRequest.findAll({ raw : true });
    expect(After.length).toBe(Before.length+1);
  });
});


describe('update', ()=>{
  it('should update a existing friendRequest unit test', async ()=>{
    let before = await models.Friendship.findAll({ raw: true});
    const friendRequest = await controller.updateFriendRequest(models.User, models.Friendship, models.FriendRequest, 1, 'APPROVED');
    let after = await models.Friendship.findAll({ raw: true });
    expect(after.length).toBe(before.length + 2);
    expect(friendRequest.status).toBe("APPROVED");
  });
});

describe('Get', ()=>{
  it('should return an user\s friendRequestlist', async ()=>{
    const friendRequest = await controller.listFriendRequest(models.User, models.FriendRequest, users[1].uid);
    expect(friendRequest.length).toBe(1);
  });
});
