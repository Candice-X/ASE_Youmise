const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const sequelize = require('sequelize');

const {app} = require('./../../app');
const models = require('./../../models');

const {cards, populateCards} = require('./../seed/seed');

beforeEach(populateCards);
 //run before every test case

describe('POST /card', ()=>{
    it('should create a new card', (done)=>{
        var note = 'Note test 3';
        request(app)
            .post('/card/card')
            .send({
                types: cards[2].types, 
                cardName: cards[2].cardName, 
                cardImgURL: cards[2].cardImgURL, 
                cardNote: cards[2].cardNote
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardNote).toBe(cards[2].cardNote);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                models.Card.findAll({ where: { cardNote: note }, raw : true }).then((card)=>{
                    expect(card.length).toBe(1);
                    expect(card[0].cardNote).toBe(note);
                    done();
                }).catch((e)=> done(e));
            });
    });
    it('should not create card with invalid data',(done)=>{
        request(app)
            .post('/card/card')
            .send()
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                models.Card.findAll({ raw: true }).then((res)=>{
                    console.log(res);
                    expect(res.length).toBe(2);
                    done();
                }).catch((e)=> done(e));
            });
    }); 
});

describe('GET /card', ()=>{
    it('should get all cards', (done)=>{
        request(app)
            .get('/card/card')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(2);
            })
            .end(done);
    })
})

describe('GET /card/:id',()=>{
    it('should return card',(done)=>{
        request(app)
            .get(`/card/card/${cards[0].cardid}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.cardNote).toBe(cards[0].cardNote);
            })
            .end(done);
    });
    it('should return 404 if card not found',(done)=>{
        var wrongId = "abcd3";
        console.log(`-----${JSON.stringify(wrongId)}----`);
        request(app)
            .get(`/card/card/${wrongId}`)
            .expect(404)
            .end(done);
    });
    // it('should not return todo doc created by other user',(done)=>{
    //     request(app)
    //         .get(`/todos/${todos[1]._id.toHexString()}`)
    //         .set('x-auth', users[0].tokens[0].token)
    //         .expect(404)
    //         .end(done);
    // });
    // it('should return 404 for non-object ids',(done)=>{
    //     request(app)
    //         .get('/todos/123abc')
    //         .set('x-auth', users[0].tokens[0].token)
    //         .expect(404)
    //         .end(done);
    // });
});

// describe('DELETE /todos/:id', ()=>{
//     it('should remove a todo',(done)=>{
//         var hexId = todos[1]._id.toHexString();

//         request(app)
//             .delete(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.todo._id).toBe(hexId);
//             })
//             .end((err,res)=>{
//                 if(err){
//                     return done(err);
//                 }
//                 Todo.findById(hexId).then((todo)=>{
//                     expect(todo).toBeFalsy();
//                     done();
//                 }).catch((e)=>done(e));  
//             });

//     });
//     it('should not remove a todo',(done)=>{
//         var hexId = todos[0]._id.toHexString();

//         request(app)
//             .delete(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .expect(404)
//             .end((err,res)=>{
//                 if(err){
//                     return done(err);
//                 }
//                 Todo.findById(hexId).then((todo)=>{
//                     expect(todo).toBeTruthy();
//                     done();
//                 }).catch((e)=>done(e));  
//             });

//     });

//     it('should return 404 if todo not found', (done)=>{
//         var hexId = new ObjectID().toHexString();
//         request(app)
//             .delete(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .expect(404)
//             .end(done);
//     });

//     it('should return 404 if object id is invalid',(done)=>{
//         request(app)
//         .delete('/todos/123abc')
//         .set('x-auth', users[1].tokens[0].token)
//         .expect(404)
//         .end(done);
//     });
// });

// describe('PATCH /todo/:id',()=>{
//     it('should update the todo', (done)=>{
//         var hexId = todos[0]._id.toHexString();
//         var text = 'This should be th new text';
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .set('x-auth', users[0].tokens[0].token)
//             .send({
//                 completed: true,
//                 text
//             })
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.todo.text).toBe(text);
//                 expect(res.body.todo.completed).toBe(true);
//                 // expect(res.body.todo.completedAt).toBeA('number');
//                 expect(typeof res.body.todo.completedAt).toBe('number');
//             })
//             .end(done);
//     });
//     it('should not update the todo created by other user', (done)=>{
//         var hexId = todos[0]._id.toHexString();
//         var text = 'This should be th new text';
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .send({
//                 completed: true,
//                 text
//             })
//             .expect(404)
//             .end(done);
//     });
//     it('should clear completedAt when todo is not completed', (done)=>{
//         var hexId = todos[1]._id.toHexString();
//         var text = 'This should be th new text!!';
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .send({
//                 completed: false,
//                 text
//             })
//             .expect(200)
//             .expect((res)=>{
//                 expect(res.body.todo.text).toBe(text);
//                 expect(res.body.todo.completed).toBe(false);
//                 expect(res.body.todo.completedAt).toBeFalsy();
//             })
//             .end(done);
//     });
// });
