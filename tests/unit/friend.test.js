const expect = require('expect');
const request = require('supertest');

const models = require('./../../models');
const controller = require('./../../routes/friends/controller');
const sequelize = require('sequelize');

const {users, populateUsers, friendships, populateFriendships} = require('./../seed/seed');

beforeEach(populateUsers);
beforeEach(populateFriendships);

after(()=>{
  return require('../../models').sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
});

describe('Create', ()=>{
  it('should add a new friendships unit test', async ()=>{
    let before = await models.Friendship.findAll({ raw: true});
    const friendship = await controller.addFriendship(models.User, models.Friendship, users[0].uid, users[1].uid);
    let after = await models.Friendship.findAll({ raw: true });
    expect(after.length).toBe(before.length + 1);
  });
});

describe('Get', ()=>{
  it('should return an user\s friendlist', async ()=>{
    const friendship = await controller.listFriends(models.User, models.Friendship, users[1].uid);
    expect(friendship.length).toBe(1);
  });
});

describe('Delete', ()=>{
  it('should delete 2 friendships between 2 friends', async ()=>{
    let before = await models.Friendship.findAll({ raw: true});
    const friendship = await controller.deleteFriends(models.User, models.Friendship, users[1].uid, users[0].uid);
    let after = await models.Friendship.findAll({ raw: true });
    expect(after.length).toBe(before.length - 2);
  });
});
