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
                models.User.findAll({where: { uid: uid }, raw: true }).then((res)=>{
                    expect(res[0].avatarUrl).toBe(users[0].avatarUrl);
                    expect(res[0].username).toBe(users[0].username);
                    done();
                }).catch((e)=> done(e));
            });
    });
});

describe('POST /user/facebooklogin',()=>{
    it('should create a user object', (done)=>{
        var facebookid = users[5].facebookid;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : users[5].username,
                email: users[5].email,
                facebookid: facebookid,
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.username).toBe(users[5].username);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { facebookid: facebookid }, raw : true }).then((user)=>{
                    expect(user[0].username).toBeTruthy();
                    expect(user[0].email).toBe(users[5].email);
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should return an existing user', (done)=>{
        var facebookid = users[1].facebookid;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : null,
                email: null,
                facebookid: facebookid,
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.username).toBe(users[1].username);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { facebookid: facebookid }, raw : true }).then((user)=>{
                    expect(user.length).toBe(1);
                    expect(user[0].email).toBe(users[1].email);
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should not create a user with empty user name', (done)=>{
        var facebookid = users[5].facebookid;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : null,
                email: users[5].email,
                facebookid: facebookid,
            })
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { facebookid: facebookid }, raw : true }).then((user)=>{
                    expect(user.length).toBe(0);
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should not create a user with existing user name', (done)=>{
        var facebookid = users[5].facebookid;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : users[0].email,
                email: users[5].email,
                facebookid: facebookid,
            })
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { facebookid: facebookid }, raw : true }).then((user)=>{
                    expect(user.length).toBe(0);
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should not create a user with emtpy email', (done)=>{
        var facebookid = users[5].facebookid;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : users[5].username,
                email: null,
                facebookid: facebookid,
            })
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { facebookid: facebookid }, raw : true }).then((user)=>{
                    expect(user.length).toBe(0);
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should not create a user with duplicate email', (done)=>{
        var facebookid = users[5].facebookid;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : users[5].username,
                email: users[0].email,
                facebookid: facebookid,
            })
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { facebookid: facebookid }, raw : true }).then((user)=>{
                    expect(user.length).toBe(0);
                    done(); 
                }).catch((e)=>done(e));
            });
    });
    it('should not create a user without facebookid', (done)=>{
        var facebookid = null;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : users[5].username,
                email: users[0].email,
                facebookid: null,
            })
            .expect(400)
            .end(done);
    });
});
