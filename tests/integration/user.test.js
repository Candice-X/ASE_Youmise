const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');
//const idtoken = 'eyJraWQiOiI0RHVBczV2VUFXdXlXb0lMbkpZaUpqcHlDWXU3YmVxZFRsd1J6V2psdk1BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwZTk4MjhlZC0wNWQyLTRmOWQtODYyNy1jYTQxMmU3NzJhYjYiLCJhdWQiOiIzdmUyYXJyZG41cTEycmUzajRzbXE1dG12OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6ImIwZmI3ZDBiLTQ2NjYtMTFlOC1hMWQ2LWRiZDk2Yzk4MDBmOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTI0NDI2NzUwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl8zY0pZVXB2MkwiLCJjdXN0b206dWlkIjoiMWRhMmQ5MzAtZWJlYS00NDdjLWFlOTgtYzg2ZjEzMmRkYjc5IiwiY29nbml0bzp1c2VybmFtZSI6ImF1dGh0ZXN0IiwiZXhwIjoxNTI0NDMwMzUwLCJpYXQiOjE1MjQ0MjY3NTAsImVtYWlsIjoieWluZ3lpbmcuaHVhbmcyMTlAZ21haWwuY29tIn0.jYpOjrk8l0TRPBmG50aVpGuucPZ9DuimGbKsHT1w8vj-4BasRZHBKW2SwQb_XKh-FOT2qIwucVkYEkys5TsTKHTBSDLCiOXEsErj729Hhr9HLoNQ54TWMbL7A_PNoMi6o_cnY_CabNsJuh__91BpKcYrXNsro7HKfACS5GdaVlQzuUSSNhU8Cnan6b9fENDV4uhur8mJ2aOxlqAU4lJLc1Yhm25usFI_zBwom0rhh982hiTyiFKKf2rUWgF2s4gdHrGjgSgmco0ll70vrLGruFGIJUyhc5Q7A_uAAr0Eo03jOnipbJrJm3k0U5B2vfumLGjj0Lxwj5LjS5S-25WDUQ';
const {app} = require('./../../app');
const models = require('./../../models');

const {users, populateUsers} = require('./../seed/seed');
// console.log('testIdtoken');
// console.log(`${testIdtoken()}`);

beforeEach(populateUsers);


// describe('get /authenticate user',()=>{
//     it('should authenticate user to get all cards', (done)=>{
//         request(app)
//             .get('/user/user/auth')
//             .set('Authorization', testIdtoken)
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.length).toBe(4);
//             })
//             .end(done);
//     });
// });

describe('get all user',()=>{
    it('should authenticate user to get all cards', (done)=>{
        request(app)
            .get('/user/user')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(4);
            })
            .end(done);
    });
});


describe('unauth PATCH /user/:id',()=>{
    it('should only update the user avatarUrl', (done)=>{
        var uid = users[0].uid;
        request(app)
            .patch(`/user/unauth/user/${uid}`)
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
            .patch(`/user/unauth/user/${uid}`)
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
            .patch(`/user/unauth/user/${uid}`)
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
            .patch(`/user/unauth/user/${uid}`)
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
    it('should not merge the user with same email with facebook', (done)=>{
        var facebookid = users[5].facebookid;
        request(app)
            .post(`/user/facebooklogin`)
            .send({
                username : users[5].username,
                email: users[0].email,
                facebookid: facebookid,
            })
            .expect(200)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.User.findAll({ where: { facebookid: facebookid }, raw : true }).then((user)=>{
                    expect(user.length).toBe(1);
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
