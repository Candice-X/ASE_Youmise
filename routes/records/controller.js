const ServerError = require('../../utils/ServerError');
const config = require('../../config');
// var moment = require('moment');

exports.dbCreateRecord = async (Record, User, senderid, receiverEmail, cardid, expireDate, cardContent, cardTitle) => {
    try{
        let result;
        let status = 1;
        if (!receiverEmail){ 
            status = 2;
        }
        let createDate = new Date();
        const receiver = await User.findAll({where: {email: receiverEmail}, raw: true});
        console.log(`receiver find ${receiver[0]}`);
        receiverid = receiver[0].uid;
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
        console.log(`new record has been create : ${result} `);
        return result;
    } catch (err) {
        throw new ServerError(400, err.message);
    }
}
exports.dbFetchAll = async (Record, User, Card) => {
    try {
      let result = await Record.findAll({ raw: true });
        if (!result){
        } else {
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                if (result.receiverid !== null){
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
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        cardImgURL: card[0].cardImgURL
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
                        receiverName: null,
                        receiverEmail: null,
                        cardImgURL: card[0].cardImgURL
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
        const record = await Record.findAll({ where: { recordid: recordid }, raw: true });
        if (record.length === 0) {
            throw new ServerError(400, err.message);
        } else {
            console.log(`Successfully find card: ${JSON.stringify(record[0])}`);
            const sender = await User.findAll({ where: { uid: record[0].senderid},raw: true });
            console.log(`sender: ${JSON.stringify(sender[0])}`);
            const card = await Card.findAll({  where: { cardid: record[0].cardid}, raw: true });
            console.log(`card: ${JSON.stringify(card[0])}`);
            let receiver;
            if (record[0].receiverid !== null){
                receiver = await User.findAll({ where: {uid: record[0].receiverid},raw: true });
                console.log(`Successfully find receiver: ${JSON.stringify(receiver[0])}`);
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
                    receiverName: receiver[0].username,
                    receiverEmail: receiver[0].email,
                    cardImgURL: card[0].cardImgURL
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
                    receiverName: null,
                    receiverEmail: null,
                    cardImgURL: card[0].cardImgURL
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
            result = await Record.findAll({ where: { senderid: senderid}, raw: true });
        } else {
            result = await Record.findAll({ where: { senderid: senderid, status: status}, raw: true });
        }
        if (!result) {
            console.log('record not exists.')
        } else {
            console.log(`Successfully find ${result.length} matching records.`);
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                if (result.receiverid !== null){
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
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        cardImgURL: card[0].cardImgURL
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
                        receiverName: null,
                        receiverEmail: null,
                        cardImgURL: card[0].cardImgURL
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

exports.dbFindByReceiver = async (Record, User, Card, receiverid, status) => {
try {
    let result;
    if (status === null){
        result = await Record.findAll({ where: { receiverid: receiverid}, raw: true });
    } else {
        result = await Record.findAll({ where: { receiverid: receiverid, status: status}, raw: true });
    }
    if (!result) {
        console.log('record not exists.')
    } else {
        console.log(`Successfully find ${result.length} matching records.`);
        let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
                const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                let receiver;
                if (result.receiverid !== null){
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
                        receiverName: receiver[0].username,
                        receiverEmail: receiver[0].email,
                        cardImgURL: card[0].cardImgURL
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
                        receiverName: null,
                        receiverEmail: null,
                        cardImgURL: card[0].cardImgURL
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
            let updateRecord = await Record.findOne({where : {recordid: recordid}});
            let result = await updateRecord.updateAttributes({
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
