// const expect = require('expect');
// const request = require('supertest');
// const _ = require('lodash');
// const sequelize = require('sequelize');
// const idtoken = 'eyJraWQiOiI0RHVBczV2VUFXdXlXb0lMbkpZaUpqcHlDWXU3YmVxZFRsd1J6V2psdk1BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwZTk4MjhlZC0wNWQyLTRmOWQtODYyNy1jYTQxMmU3NzJhYjYiLCJhdWQiOiIzdmUyYXJyZG41cTEycmUzajRzbXE1dG12OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6ImIwZmI3ZDBiLTQ2NjYtMTFlOC1hMWQ2LWRiZDk2Yzk4MDBmOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTI0NDI2NzUwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl8zY0pZVXB2MkwiLCJjdXN0b206dWlkIjoiMWRhMmQ5MzAtZWJlYS00NDdjLWFlOTgtYzg2ZjEzMmRkYjc5IiwiY29nbml0bzp1c2VybmFtZSI6ImF1dGh0ZXN0IiwiZXhwIjoxNTI0NDMwMzUwLCJpYXQiOjE1MjQ0MjY3NTAsImVtYWlsIjoieWluZ3lpbmcuaHVhbmcyMTlAZ21haWwuY29tIn0.jYpOjrk8l0TRPBmG50aVpGuucPZ9DuimGbKsHT1w8vj-4BasRZHBKW2SwQb_XKh-FOT2qIwucVkYEkys5TsTKHTBSDLCiOXEsErj729Hhr9HLoNQ54TWMbL7A_PNoMi6o_cnY_CabNsJuh__91BpKcYrXNsro7HKfACS5GdaVlQzuUSSNhU8Cnan6b9fENDV4uhur8mJ2aOxlqAU4lJLc1Yhm25usFI_zBwom0rhh982hiTyiFKKf2rUWgF2s4gdHrGjgSgmco0ll70vrLGruFGIJUyhc5Q7A_uAAr0Eo03jOnipbJrJm3k0U5B2vfumLGjj0Lxwj5LjS5S-25WDUQ';
// const idtoken2 = '123';
// const {app} = require('./../../app');
// const models = require('./../../models');

// const {users, populateUsers, cards, populateCards, records, populateRecords, messages, populateMessages} = require('./../seed/seed');

// beforeEach(populateUsers);
// beforeEach(populateCards);
// beforeEach(populateRecords);
// beforeEach(populateMessages);


// describe('get /testauthenticate',()=>{
//     it('should authenticate', (done)=>{
//         request(app)
//             .get('/authUser/auth')
//             .set('Authorization', idtoken)
//             .expect(200)
//             .end(done);
//     });
//     it('should not auth', (done)=>{
//         request(app)
//             .get('/authUser/auth')
//             .set('Authorization', idtoken2)
//             .expect(400)
//             .end(done);
//     });
// });
