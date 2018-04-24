const ServerError = require('../../utils/ServerError');
const config = require('../../config');
const MessageController = require('../messages/controller');

exports.dbCreateRecord = async (Record, User, senderid, receiverEmail, cardid, expireDate, cardContent, cardTitle) => {
    try{
        let result;
        let status = 1;
        if (!receiverEmail){
            status = 2;
        }
        let createDate = new Date();
        let receiverid = null;
        if (receiverEmail !== null){
            const receiver = await User.findAll({where: {email: receiverEmail}, raw: true});
            receiverid = receiver[0].uid;
        }
        const raw = await Record.create({
            senderid,
            receiverid,
            cardid,
            createDate,
            expireDate,
            cardContent,
            cardTitle,
            status
        });
        result = raw.get({ plain: true });
        return result;
    } catch (err) {
        throw new ServerError(400, err.message);
    }
}
exports.dbFetchAll = async (Record, User, Card) => {
    try {
      let result = await Record.findAll({ order: [
        ['createdAt', 'DESC']
      ],raw: true });
        if (!result){
        } else {
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                let senderusername = "wrong user";
                let senderemail = "wrong user"
                if (sender.length !== 0){
                    senderusername = sender[0].username;
                    senderemail =sender[0].email;
                    senderurl = sender[0].avatarUrl;
                }
                if (result[i].receiverid !== null){
                    receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: senderusername,
                        senderEmail: senderemail,
                        senderURL: senderurl,
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        receiverURL: receiver[0].avatarUrl,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                } else {
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: senderusername,
                        senderEmail: senderemail,
                        senderURL: senderurl,
                        receiverName: null,
                        receiverEmail: null,
                        receiverURL: null,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                }
            }
            return res;
        }
    } catch (err) {
      throw new ServerError(400, err.message);
    }
};

exports.dbFindById = async (Record, User, Card, recordid) => {
    try {
        const record = await Record.findAll({ where: { recordid: recordid },order: [
            ['createdAt', 'DESC']
          ], raw: true });
        if (record.length === 0) {
            throw new ServerError(400, err.message);
        } else {
            const sender = await User.findAll({ where: { uid: record[0].senderid},raw: true });
            const card = await Card.findAll({  where: { cardid: record[0].cardid}, raw: true });
            let receiver;
            if (record[0].receiverid !== null){
                receiver = await User.findAll({ where: {uid: record[0].receiverid},raw: true });
                return {
                    recordid: record[0].recordid,
                    senderid: record[0].senderid,
                    receiverid: record[0].receiverid,
                    cardid: record[0].cardid,
                    createDate: record[0].createDate,
                    expireDate: record[0].expireDate,
                    cardContent: record[0].cardContent,
                    cardTitle: record[0].cardTitle,
                    status: record[0].status,
                    senderName: sender[0].username,
                    senderEmail: sender[0].email,
                    senderURL: sender[0].avatarUrl,
                    receiverName: receiver[0].username,
                    receiverEmail: receiver[0].email,
                    receiverURL: receiver[0].avatarUrl,
                    cardImgURL: card[0].cardImgURL,
                    cardNote: card[0].cardNote
                };
            } else {
                return {
                    recordid: record[0].recordid,
                    senderid: record[0].senderid,
                    receiverid: record[0].receiverid,
                    cardid: record[0].cardid,
                    createDate: record[0].createDate,
                    expireDate: record[0].expireDate,
                    cardContent: record[0].cardContent,
                    cardTitle: record[0].cardTitle,
                    status: record[0].status,
                    senderName: sender[0].username,
                    senderEmail: sender[0].email,
                    senderURL: sender[0].avatarUrl,
                    receiverName: null,
                    receiverEmail: null,
                    receiverURL: null,
                    cardImgURL: card[0].cardImgURL,
                    cardNote: card[0].cardNote
                }
            }

        }
    } catch (err) {
        throw new ServerError(400, err.message);
    }
};

exports.dbFindBySender = async (Record,User, Card, senderid, status) => {
    try {
        let result;
        if (status === null){
            result = await Record.findAll({ where: { senderid: senderid},order: [
                ['createdAt', 'DESC']
              ], raw: true });
        } else {
            result = await Record.findAll({ where: { senderid: senderid, status: status}, order: [
                ['createdAt', 'DESC']
              ], raw: true });
        }
        if (!result) {
            throw new ServerError(400, 'record not exists.');
        } else {
            console.log(`Successfully find ${result.length} matching records.`);
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                if (result[i].receiverid !== null){
                    receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        receiverURL: receiver[0].avatarUrl,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                } else {
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: null,
                        receiverEmail: null,
                        receiverURL: null,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                }
            }
            return res;
            // return records;
        }
    } catch (err) {
        throw new ServerError(400, err.message);
    }
  };

exports.dbFindBySenderAndFriend = async (Record,User, Card, senderid, friendid) => {
    try {
        let result;
        result = await Record.findAll({ where: { senderid: senderid, receiverid: friendid}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
        if (!result) {
            throw new ServerError(400, 'record not exists.');
        } else {
            console.log(`Successfully find ${result.length} matching records.`);
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                if (result[i].receiverid !== null){
                    receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        receiverURL: receiver[0].avatarUrl,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                } else {
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: null,
                        receiverEmail: null,
                        receiverURL: null,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                }
            }
            return res;
            // return records;
        }
    } catch (err) {
        console.log(err.message);
        throw new ServerError(400, err.message);
    }
  };

  exports.dbFindByReceiverAndFriend = async (Record, User, Card, receiverid, friendid) => {
    try {
        let result;
        result = await Record.findAll({ where: { senderid: friendid, receiverid: receiverid}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
        if (!result) {
            throw new ServerError(400, 'record not exists.');
        } else {
            console.log(`Successfully find ${result.length} matching records.`);
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                if (result[i].receiverid !== null){
                    receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        receiverURL: receiver[0].avatarUrl,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                } else {
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: null,
                        receiverEmail: null,
                        receiverURL: null,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                }
            }
            return res;
            // return records;
        }
    } catch (err) {
        throw new ServerError(400, err.message);
    }
  };

exports.dbFindByReceiver = async (Record, User, Card, receiverid, status) => {
try {
    let result;
    if (status === null){
        result = await Record.findAll({ where: { receiverid: receiverid}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
    } else {
        result = await Record.findAll({ where: { receiverid: receiverid, status: status}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
    }
    if (!result) {
        throw new ServerError(400, 'record not exists.');
    } else {
        console.log(`Successfully find ${result.length} matching records.`);
        let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                if (result[i].receiverid !== null){
                    receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        receiverURL: receiver[0].avatarUrl,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                } else {
                    res.push({
                        recordid: result[i].recordid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        cardid: result[i].cardid,
                        createDate: result[i].createDate,
                        expireDate: result[i].expireDate,
                        cardContent: result[i].cardContent,
                        cardTitle: result[i].cardTitle,
                        status: result[i].status,
                        senderName: sender[0].username,
                        senderEmail: sender[0].email,
                        senderURL: sender[0].avatarUrl,
                        receiverName: null,
                        receiverEmail: null,
                        receiverURL: null,
                        cardImgURL: card[0].cardImgURL,
                        cardNote: card[0].cardNote
                    });
                }
            }
            return res;
        // return records;
    }
} catch (err) {

    throw new ServerError(400, err.message);
}
};

exports.dbUpdateById = async (Record, recordid, receiverid, status) => {
    try {
            let finishDate = null;
            if (status === 5){
                finishDate = new Date();
            }
            let record = await Record.findOne({where : {recordid: recordid}});
            if(!record){
              throw new Error('Record not found');
            }
            let result = await record.updateAttributes({
                receiverid : receiverid,
                status: status,
                finishDate: finishDate
            });
            return result;
    } catch (err) {
        console.log(err);
        throw new ServerError(400, err.message);
    }
};
// card receiver use card
exports.dbUseCard = async (Message, Record, recordid, title, msgContent) => {
  try {
    let record = await Record.findOne({ where : { recordid } });
    if(!record){
      throw new Error('Record not found!');
    }
    if(record.get('status') === 6){
      throw new Error('Your card is already in use');
    }
    if(record.get('status') === 5){
      throw new Error('You have already used this card!');
    }
    if(record.get('status') === 4){
      throw new Error('Card expired.');
    }
    const senderid = record.get('receiverid');
    const receiverid = record.get('senderid');
    const message = await MessageController.dbCreateMessage(Message, senderid, receiverid, recordid, title, msgContent);
    const status = 6;
    const updateRecord = await exports.dbUpdateById(Record, recordid, senderid, status);
    return message;
  } catch (err) {
    console.log(err);
    throw new ServerError(400, err.message);
  }
};

//recordstatus can be 1 or 5, 1 is reject, 5 is approve;
exports.dbUseCardReply = async (Message, Record, recordid, recordstatus, title, msgContent) => {
  try {
    let record = await Record.findOne({where : {recordid: recordid}});
    if(!record){
      throw new Error('Record not found');
    }
    const senderid = record.get('senderid');
    const receiverid = record.get('receiverid');
    if(record.get('status') === 5){
      throw new Error('You have already used this card!');
    }
    if(record.get('status') === 4){
      throw new Error('Card expired.');
    }
    const message = await MessageController.dbCreateMessage(Message, senderid, receiverid, recordid, title, msgContent);
    const updateRecord = await exports.dbUpdateById(Record, recordid, senderid, recordstatus);
    return message;
  } catch (err) {
    console.log(err);
    throw new ServerError(400, err.message);
  }
};

exports.dbDeleteById = async (Record, recordid) => {
    try {
        let record = await Record.findAll({ where: {recordid : recordid}, raw:true });
        let result = await Record.destroy({ where: {recordid : recordid}, raw:true});
        if (record.length === 0) {
            throw new ServerError(400);
        }
        return record[0];
    } catch (err) {
        const message = err.errors.reduce((prev, { message }) => {
            return `${prev}${message}; `;
            }, '');
        throw new ServerError(400, err.message);
    }
};
