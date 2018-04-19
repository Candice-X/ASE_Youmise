const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const {app} = require('./../../app');
const models = require('./../../models');

const {users, populateUsers} = require('./../seed/seed');

beforeEach(populateUsers);

describe('PATCH /user/:id',()=>{
    it('should only update the user avatarUrl', (done)=>{
        var uid = users[0].uid;
        request(app)
            .patch(`/user/user/${uid}`)
            .send({
                username : null,
                avatarUrl: "11111",
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.avatarUrl).toBe("11111");
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { uid: uid }, raw : true }).then((user)=>{
                    expect(user[0].username).toBeTruthy();
                    expect(user[0].avatarUrl).toBe("11111");
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should only update the username', (done)=>{
        var uid = users[0].uid;
        request(app)
            .patch(`/user/user/${uid}`)
            .send({
                username : "dodo",
                avatarUrl: null,
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.username).toBe("dodo");
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { uid: uid }, raw : true }).then((user)=>{
                    expect(user[0].avatarUrl).toBeTruthy();
                    expect(user[0].username).toBe("dodo");
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should both update the username and the avatarUrl', (done)=>{
        var uid = users[0].uid;
        request(app)
            .patch(`/user/user/${uid}`)
            .send({
                username : "dodo",
                avatarUrl: "11111",
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.username).toBe("dodo");
                expect(res.body.avatarUrl).toBe("11111");
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { uid: uid }, raw : true }).then((user)=>{
                    expect(user[0].avatarUrl).toBe("11111");
                    expect(user[0].username).toBe("dodo");
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should not update if both username and avatarUrl are null', (done)=>{
        var uid = users[0].uid;
        request(app)
            .patch(`/user/user/${uid}`)
            .send({
                username : null,
                avatarUrl: null,
            })
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ raw: true }).then((res)=>{
                    expect(res[0].avatarUrl).toBe(users[0].avatarUrl);
                    expect(res[0].username).toBe(users[0].username);
                    done();
                }).catch((e)=> done(e));
            });
    });
});
