const ServerError = require('../../utils/ServerError');
const config = require('../../config');
// var moment = require('moment');

exports.dbCreateMessage = async (Message, senderid, receiverid, recordid, title, msgContent) => {
    try{
        let result;
        let status = 1;
        let createDate = new Date();
        const raw = await Message.create({
            senderid,
            receiverid,
            recordid,
            status,
            title,
            msgContent
        });
        result = raw.get({ plain: true });
        console.log(`new message has been create : ${result} `);
        return result;
    } catch (err) {
        throw new ServerError(400, err.message);
    }
}
exports.dbFetchAll = async (Message, Record, Card) => {
    try {
        let result;
        result = await Message.findAll({ order: [
            ['createdAt', 'DESC']
          ], raw: true });
        if (!result){
            throw new ServerError(400, err.message);
        } else {
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                let record;
                if (result[i].recordid !== null){
                    record = await Record.findAll({  where: { recordid: result[i].recordid}, raw: true });
                }
                if (record[0]){
                    let card = await Card.findAll({  where: { cardid: record[0].cardid}, raw: true });
                    let cardtype = null;
                    if (card[0]){
                        cardtype = card[0].types;
                    }
                    res.push({
                        messageid: result[i].messageid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        recordid: result[i].recordid,
                        status: result[i].status,
                        title: result[i].title,
                        msgContent: result[i].msgContent,
                        cardContent: record[0].cardContent,
                        cardTitle: record[0].cardTitle,
                        cardtype: cardtype
                    });
                } else {
                    res.push({
                        messageid: result[i].messageid,
                        senderid: result[i].senderid,
                        receiverid: result[i].receiverid,
                        recordid: result[i].recordid,
                        status: result[i].status,
                        title: result[i].title,
                        msgContent: result[i].msgContent,
                        cardContent: null,
                        cardTitle: null,
                        cardtype: null
                    });
                }
            }
            return res;
        }
    } catch (err) {
      throw new ServerError(400, err.message);
    }
  };

exports.dbFindById = async (Message, Record, Card, messageid) => {
    try {
        let result;
        result = await Message.findAll({ where: { messageid: messageid }, order: [
            ['createdAt', 'DESC']
          ], raw: true });
        if (!result) {
            throw new ServerError(400, err.message);
        } else {
            const record = await Record.findAll({ where: { recordid: result[0].recordid},raw: true });
            if (record[0]){
                const card = await Card.findAll({  where: { cardid: record[0].cardid}, raw: true });
                let cardtype = null;
                if (card[0]){
                    cardtype = card[0].types;
                }
                return {
                    messageid: result[0].messageid,
                    senderid: result[0].senderid,
                    receiverid: result[0].receiverid,
                    recordid: result[0].recordid,
                    status: result[0].status,
                    title: result[0].title,
                    msgContent: result[0].msgContent,
                    cardContent: record[0].cardContent,
                    cardTitle: record[0].cardTitle,
                    cardtype: cardtype
                };
            } else {
                return {
                    messageid: result[0].messageid,
                    senderid: result[0].senderid,
                    receiverid: result[0].receiverid,
                    recordid: result[0].recordid,
                    status: result[0].status,
                    title: result[0].title,
                    msgContent: result[0].msgContent,
                    cardContent: null,
                    cardTitle: null,
                    cardtype: null
                }
            }

        }
    } catch (err) {
        throw new ServerError(400, err.message);
    }
  };

exports.dbFindBySender = async (Message, Record, Card, senderid, status) => {
    try {
        let result;
        if (status === null){
            result = await Message.findAll({ where: { senderid: senderid}, order: [
                ['createdAt', 'DESC']
              ], raw: true });
        } else {
            result = await Message.findAll({ where: { senderid: senderid, status: status}, order: [
                ['createdAt', 'DESC']
              ], raw: true });
        }
        if (!result) {
            throw new ServerError(400, "Message for this sender does not exist");
        } else {
            console.log(`Successfully find ${result.length} matching records.`);
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const record = await Record.findAll({ where: { recordid: result[i].recordid},raw: true });
                // const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
                if (record[0]){
                    const card = await Card.findAll({ where: {cardid: record[0].cardid},raw: true });
                    let cardtype = null;
                    if(card[0]){
                        cardtype = card[0].types;
                    }
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: record[0].cardContent,
                        cardTitle: record[0].cardTitle,
                        cardtype: cardtype
                    });
                } else {
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: null,
                        cardTitle: null,
                        cardtype: null
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

exports.dbFindByReceiver = async (Message, Record, Card, receiverid, status) => {
try {
    let result;
    if (status === null){
        result = await Message.findAll({ where: { receiverid: receiverid}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
    } else {
        result = await Message.findAll({ where: { receiverid: receiverid, status: status}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
    }
    if (!result) {
        throw new ServerError(400, "Message for this receiver does not exist");
    } else {
        console.log(`Successfully find ${result.length} matching records.`);
        let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const record = await Record.findAll({ where: { recordid: result[i].recordid},raw: true });
                if (record[0]){
                    const card = await Card.findAll({ where: {cardid: record[0].cardid},raw: true });
                    let cardtype = null;
                    if (card[0]){
                        cardtype = card[0].types;
                    }
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: record[0].cardContent,
                        cardTitle: record[0].cardTitle,
                        cardtype: cardtype
                    });
                } else {
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: null,
                        cardTitle: null,
                        cardtype: null
                    });
                }
            }
            return res;
    }
} catch (err) {
    throw new ServerError(400, err.message);
}
};

exports.dbFindBySenderAndFriend = async (Message, Record, Card, senderid, friendid) => {
    try {
        let result;
        result = await Message.findAll({ where: { senderid: senderid, receiverid: friendid}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
        if (!result) {
            throw new ServerError(400, 'message for this sender and friend does not exist.');
        } else {
            console.log(`Successfully find ${result.length} matching records.`);
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const record = await Record.findAll({ where: { recordid: result[i].recordid},raw: true });
                if (record[0] !== null){
                    const card = await Card.findAll({ where: {cardid: record[0].cardid},raw: true });
                    let cardtype = null;
                    if( card[0]){
                        cardtype = card[0].types;
                    }
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: record[0].cardContent,
                        cardTitle: record[0].cardTitle,
                        cardtype: cardtype
                    });
                } else {
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: null,
                        cardTitle: null,
                        cardtype: null
                    });
                }
            }
            return res;
        }
    } catch (err) {
        console.log(err.message);
        throw new ServerError(400, err.message);
    }
  };

  exports.dbFindByReceiverAndFriend = async (Message, Record, Card, receiverid, friendid) => {
    try {
        let result;
        result = await Message.findAll({ where: { senderid: friendid, receiverid: receiverid}, order: [
            ['createdAt', 'DESC']
          ], raw: true });
        if (!result) {
            throw new ServerError(400, 'message for this receiverer and friend does not exist.');
        } else {
            console.log(`Successfully find ${result.length} matching records.`);
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                const record = await Record.findAll({ where: { recordid: result[i].recordid},raw: true });
                if (record[0] !== null){
                    const card = await Card.findAll({ where: {cardid: record[0].cardid},raw: true });
                    let cardtype = null;
                    if( card[0]){
                        cardtype = card[0].types;
                    }
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: record[0].cardContent,
                        cardTitle: record[0].cardTitle,
                        cardtype: cardtype
                    });
                } else {
                    res.push({
                        messageid: result[0].messageid,
                        senderid: result[0].senderid,
                        receiverid: result[0].receiverid,
                        recordid: result[0].recordid,
                        status: result[0].status,
                        title: result[0].title,
                        msgContent: result[0].msgContent,
                        cardContent: null,
                        cardTitle: null,
                        cardtype: null
                    });
                }
            }
            return res;
        }
    } catch (err) {
        console.log(err.message);
        throw new ServerError(400, err.message);
    }
  };

exports.dbUpdateById = async (Message, messageid, status) => {
    try {
            let updateMessage = await Message.findOne({where : {messageid: messageid}});
            let result = await updateMessage.updateAttributes({
                status: status
            });
            return result;
    } catch (err) {
        console.log(err);
        throw new ServerError(400, err.message);
    }
};

exports.dbDeleteById = async (Message, messageid) => {
    try {
        let message = await Message.findAll({ where: {messageid : messageid}, raw:true });
        let result = await Message.destroy({ where: {messageid : messageid}, raw:true});

        if (message.length === 0) {
            throw new ServerError(400, "message does not exist");
        }
        return message[0];
    } catch (err) {
        throw new ServerError(400, err.message);
    }
};
