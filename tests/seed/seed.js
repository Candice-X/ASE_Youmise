const sequelize = require('sequelize');
const models = require('./../../models');
const {Card} = require('./../../routes/cards/controller');
const moment = require('moment');

before(async () => {
    return await require('../../models').sequelize.sync({force:true});
});

function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
const CardOneId = generateUUID();
const CardTwoId = generateUUID();
const CardThreeId = generateUUID();
const cards = [{
    cardid: CardOneId,
    types: 1,
    cardName: 'Lunch Invitation',
    cardImgURL: 'https://123.com',
    cardNote: "Note test 1"
},{
    cardid: CardTwoId,
    types: 2,
    cardName: 'Movie Invitation',
    cardImgURL: 'https://456.com',
    cardNote: "Note test 2"
},{
    cardid: CardThreeId,
    types: 3,
    cardName: 'Dinner Invitation',
    cardImgURL: 'https://789.com',
    cardNote: "Note test 3"
}];


const RecordOneId = generateUUID();
const RecordTwoId = generateUUID();
const RecordThreeId = generateUUID();
const SenderOneId = generateUUID();
const SenderTwoId = generateUUID();
const SenderThreeId = generateUUID();
const ReceiverOneId = generateUUID();
const ReceiverTwoId = generateUUID();
const ReceiverThreeId = generateUUID();

const users = [{
    uid: SenderOneId,
    username: "chenfu",
    email : "chenfu@123.com",
    firstName: "Fu",
    lastName: "Chen",
    avatarUrl: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/girl.png",
    gender: "Male"
},{
    uid: ReceiverOneId,
    username: "hyy",
    email : "hyy@123.com",
    firstName: "yy",
    lastName: "h",
    avatarUrl: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/girl.png",
    gender: "Female"
},{
    uid: SenderTwoId,
    username: "xyh",
    email : "xyh@123.com",
    firstName: "yh",
    lastName: "x",
    avatarUrl: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/girl.png",
    gender: "Female"
},{
    uid: ReceiverTwoId,
    username: "weg",
    email : "weg@123.com",
    firstName: "eg",
    lastName: "w",
    avatarUrl: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/girl.png",
    gender: "Male"
},{
    uid: SenderThreeId,
    username: "zss",
    email : "zss@123.com",
    firstName: "ss",
    lastName: "z",
    avatarUrl: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/girl.png",
    gender: "Female"
},{
    uid: ReceiverThreeId,
    username: "xjm",
    email : "xjm@123.com",
    firstName: "jm",
    lastName: "x",
    avatarUrl: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/girl.png",
    gender: "Male"
}];

const records = [{
    recordid: RecordOneId,
    senderid: SenderOneId,
    receiverid: ReceiverOneId,
    cardid: CardOneId,
    expireDate: null,
    createDate: new Date(),
    finishDate: null,
    cardContent: "chenfu invite hyy for lunch.",
    cardTitle: "lunch invitation",
    status: 1
},{
    recordid: RecordTwoId,
    senderid: SenderTwoId,
    receiverid: ReceiverTwoId,
    cardid: CardTwoId,
    expireDate: null,
    createDate: new Date(),
    finishDate: null,
    cardContent: "chenfu invite caizong for movie.",
    cardTitle: "movie invitation",
    status: 1
},{
    recordid: RecordThreeId,
    senderid: SenderThreeId,
    receiverid: ReceiverThreeId,
    cardid: CardThreeId,
    expireDate: null,
    createDate: new Date(),
    finishDate: null,
    cardContent: "chenfu invite xxx for dinner.",
    cardTitle: "dinner invitation",
    status: 1
}];

const MessageOneId = generateUUID();
const MessageTwoId = generateUUID();
const MessageThreeId = generateUUID();
const messages = [{
    messageid: MessageOneId,
    senderid: SenderOneId,
    receiverid: ReceiverOneId,
    recordid: RecordOneId,
    status: 1,
    title: "Movie invitation",
    msgContent: "This is a move invitation sent by chenfu."
},{
    messageid: MessageTwoId,
    senderid: SenderTwoId,
    receiverid: ReceiverTwoId,
    recordid: RecordTwoId,
    status: 1,
    title: "Dinner invitation",
    msgContent: "This is a dinner invitation sent by ergou."
},{
    messageid: MessageThreeId,
    senderid: SenderThreeId,
    receiverid: ReceiverThreeId,
    recordid: RecordThreeId,
    status: 1,
    title: "Drink invitation",
    msgContent: "This is a Drinks invitation sent by hyy."
}];

const FriendRequestOneId = 1;
const FriendRequestTwoId = 2;
const FriendRequestThreeId = 3;
const friendRequests = [{
    friendRequestId: FriendRequestOneId,
    senderId: SenderOneId,
    senderUsername: "chenfu",
    receiverId: ReceiverOneId,
    receiverUsername: 'hyy',
    status: 'SENT',
},{
    friendRequestId: FriendRequestTwoId,
    senderId: SenderTwoId,
    senderUsername: "xyh",
    receiverId: ReceiverTwoId,
    receiverUsername: 'weg',
    status: 'SENT',
},{
    friendRequestId: FriendRequestThreeId,
    senderId: SenderThreeId,
    senderUsername: "zss",
    receiverId: ReceiverThreeId,
    receiverUsername: 'xjm',
    status: 'SENT',
}];

const FriendshipOneId = 1;
const FriendshipTwoId = 2;
const FriendshipThreeId = 3;
const FriendshipFourId = 3;
const friendships = [{
    friendshipId: FriendshipOneId,
    userId: SenderOneId,
    friendId: ReceiverOneId,
},{
    friendshipId: FriendshipTwoId,
    userId: ReceiverOneId,
    friendId: SenderOneId,
},{
    friendshipId: FriendshipThreeId,
    userId: SenderTwoId,
    friendId: ReceiverTwoId,
},{
    friendshipId: FriendshipFourId,
    userId: ReceiverTwoId,
    friendId: SenderTwoId,
}];

const populateCards = (done)=>{
    models.Card.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        const cardOne = models.Card.create(cards[0]).then((card)=>{
            return card;

    });
        const cardTwo =  models.Card.create(cards[1]).then((card)=>{
            return card;
    });
        return Promise.all([cardOne, cardTwo])
    }).then(()=> done());
};
const populateUsers = (done)=>{
    models.User.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        const userOne = models.User.create(users[0]).then((user)=>{
            return user;

    });
        const userTwo =  models.User.create(users[1]).then((user)=>{
            return user;
    });
        const userThree =  models.User.create(users[2]).then((user)=>{
            return user;
    });
        const userFour =  models.User.create(users[3]).then((user)=>{
            return user;
    });

        return Promise.all([userOne, userTwo, userThree, userFour])
    }).then(()=> done());
};

const populateRecords = (done)=>{
    models.Record.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        const recordOne = models.Record.create(records[0]).then((record)=>{
            return record;

    });
        const recordTwo =  models.Record.create(records[1]).then((record)=>{
            return record;
    });
        return Promise.all([recordOne, recordTwo])
    }).then(()=> done());
};
const populateMessages = (done)=>{
    models.Message.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        const messageOne = models.Message.create(messages[0]).then((message)=>{
            return message;

    });
        const messageTwo =  models.Message.create(messages[1]).then((message)=>{
            return message;
    });
        return Promise.all([messageOne, messageTwo])
    }).then(()=> done());
};

const populateFriendRequests = (done)=>{
    models.FriendRequest.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        const FriendRequestOne = models.FriendRequest.create(friendRequests[0]).then((friendRequest)=>{
            return friendRequest;

    });
        const FriendRequestTwo =  models.FriendRequest.create(friendRequests[1]).then((friendRequest)=>{
            return friendRequest;
    });
        return Promise.all([FriendRequestOne, FriendRequestTwo])
    }).then(()=> {
      done();
    });
};

const populateFriendships = (done)=>{
    models.Friendship.destroy({
        where: {},
        truncate: true
    }).then(()=>{
        const FriendshipOne = models.Friendship.create(friendships[0]).then((friendship)=>{
            return friendship;

    });
        const FriendshipTwo =  models.Friendship.create(friendships[1]).then((friendship)=>{
            return friendship;
    });
        return Promise.all([FriendshipOne, FriendshipTwo])
    }).then(()=> {
      done();
    });
};

module.exports = {cards, populateCards, users, populateUsers, records, populateRecords, messages, populateMessages, friendRequests, populateFriendRequests, friendships, populateFriendships};
// module.exports = {cards, populateCards, users, populateUsers, records, populateRecords, messages, populateMessages};
