const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const {app} = require('./../../app');
const models = require('./../../models');
const controller = require('./../../routes/friends/controller');

const {users, populateUsers, friendRequests, populateFriendRequests} = require('./../seed/seed');

beforeEach(populateUsers);
beforeEach(populateFriendRequests);
 //run before every test case
 after(()=>{
    return require('../../models').sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
});

describe('create', ()=>{
    it('should create a friendRequest unit test', async ()=>{
        let note = 'Note test 3';
        let lengthBefore = await models.FriendRequest.findAll({ raw: true });
        const friendRequest = await controller.sendFriendRequest(models.User, models.Friendship, models.FriendRequest, users[3].userId, users[4].email);
        models.FriendRequest.findAll({ raw: true }).then((res)=>{
            expect(res.length).toBe(lengthBefore+1);
            done();
        }).catch((e)=> done(e));
    });
});
