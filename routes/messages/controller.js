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
      let result = await Message.findAll({ raw: true });
        if (!result){
            throw new ServerError(400, err.message);
        } else {
            let res = []
            for (var i = 0, len = result.length; i < len; i++){
                let record;
                if (result[i].recordid !== null){
                    record = await Record.findAll({  where: { recordid: result[i].recordid}, raw: true });
                }
                if (record){
                    let card = await Card.findAll({  where: { cardid: record[0].cardid}, raw: true });
                    let cardtype = null;
                    if (card){
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
                        cardtype: cardtype
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
        const result = await Message.findAll({ where: { messageid: messageid }, raw: true });
        if (!result) {
            throw new ServerError(400, err.message);
        } else {
            const record = await Record.findAll({ where: { uid: record[0].senderid},raw: true });
            console.log(`sender: ${JSON.stringify(sender[0])}`);
            // const card = await Card.findAll({  where: { cardid: record[0].cardid}, raw: true });
            // console.log(`card: ${JSON.stringify(card[0])}`);
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
                    messageid: result[i].messageid, 
                    senderid: result[i].senderid,
                    receiverid: result[i].receiverid,
                    recordid: result[i].recordid,
                    status: result[i].status,
                    title: result[i].title,
                    msgContent: result[i].msgContent,
                    cardContent: null,
                    cardTitle: null
                }
            }          

        }
    } catch (err) {
        throw new ServerError(400, err.message);
    }
  };

//   exports.dbFindBySender = async (Record,User, Card, senderid, status) => {
//     try {
//         let result;
//         if (status === null){
//             result = await Record.findAll({ where: { senderid: senderid}, raw: true });
//         } else {
//             result = await Record.findAll({ where: { senderid: senderid, status: status}, raw: true });
//         }
//         if (!result) {
//             console.log('record not exists.')
//         } else {
//             console.log(`Successfully find ${result.length} matching records.`);
//             let res = []
//             for (var i = 0, len = result.length; i < len; i++){
//                 const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
//                 const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
//                 let receiver;
//                 if (result.receiverid !== null){
//                     receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status,
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: receiver[0].username,
//                         receiverEmail: receiver[0].email,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 } else {
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status, 
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: null,
//                         receiverEmail: null,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 }
//             }          
//             return res;
//             // return records;
//         }
//     } catch (err) {
//         console.log(err.message);
//         throw new ServerError(400, err.message);
//     }
//   };

// exports.dbFindBySenderAndFriend = async (Record,User, Card, senderid,friendid) => {
//     try {
//         let result;   
//         console.log(`this is the senderid: ${senderid}`);   
//         console.log(`this is the receiverid: ${friendid}`);   
//         result = await Record.findAll({ where: { senderid: senderid, receiverid: friendid}, raw: true });
//         if (!result) {
//             console.log('record not exists.')
//         } else {
//             console.log(`Successfully find ${result.length} matching records.`);
//             let res = []
//             for (var i = 0, len = result.length; i < len; i++){
//                 const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
//                 const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
//                 let receiver;
//                 if (result.receiverid !== null){
//                     receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status,
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: receiver[0].username,
//                         receiverEmail: receiver[0].email,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 } else {
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status, 
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: null,
//                         receiverEmail: null,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 }
//             }          
//             return res;
//             // return records;
//         }
//     } catch (err) {
//         console.log(err.message);
//         throw new ServerError(400, err.message);
//     }
//   };

//   exports.dbFindByReceiverAndFriend = async (Record,User, Card, receiverid, friendid) => {
//     try {
//         let result;   
//         console.log(`this is the senderid: ${receiverid}`);   
//         console.log(`this is the receiverid: ${friendid}`);   
//         result = await Record.findAll({ where: { senderid: friendid, receiverid: receiverid}, raw: true });
//         if (!result) {
//             console.log('record not exists.')
//         } else {
//             console.log(`Successfully find ${result.length} matching records.`);
//             let res = []
//             for (var i = 0, len = result.length; i < len; i++){
//                 const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
//                 const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
//                 let receiver;
//                 if (result.receiverid !== null){
//                     receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status,
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: receiver[0].username,
//                         receiverEmail: receiver[0].email,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 } else {
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status, 
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: null,
//                         receiverEmail: null,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 }
//             }          
//             return res;
//             // return records;
//         }
//     } catch (err) {
//         console.log(err.message);
//         throw new ServerError(400, err.message);
//     }
//   };

// exports.dbFindByReceiver = async (Record, User, Card, receiverid, status) => {
// try {
//     let result;
//     if (status === null){
//         result = await Record.findAll({ where: { receiverid: receiverid}, raw: true });
//     } else {
//         result = await Record.findAll({ where: { receiverid: receiverid, status: status}, raw: true });
//     }
//     if (!result) {
//         console.log('record not exists.')
//     } else {
//         console.log(`Successfully find ${result.length} matching records.`);
//         let res = []
//             for (var i = 0, len = result.length; i < len; i++){
//                 const sender = await User.findAll({ where: { uid: result[i].senderid},raw: true });
//                 const card = await Card.findAll({  where: { cardid: result[i].cardid}, raw: true });
//                 let receiver;
//                 if (result.receiverid !== null){
//                     receiver = await User.findAll({ where: {uid: result[i].receiverid},raw: true });
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status,
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: receiver[0].username,
//                         receiverEmail: receiver[0].email,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 } else {
//                     res.push({
//                         recordid: result[i].recordid, 
//                         senderid: result[i].senderid,
//                         receiverid: result[i].receiverid,
//                         cardid: result[i].cardid,
//                         createDate: result[i].createDate,
//                         expireDate: result[i].expireDate,
//                         cardContent: result[i].cardContent,
//                         cardTitle: result[i].cardTitle,
//                         status: result[i].status, 
//                         senderName: sender[0].username,
//                         senderEmail: sender[0].email,
//                         receiverName: null,
//                         receiverEmail: null,
//                         cardImgURL: card[0].cardImgURL
//                     });
//                 }
//             }          
//             return res;
//         // return records;
//     }
// } catch (err) {

//     throw new ServerError(400, err.message);
// }
// };

// exports.dbUpdateById = async (Record, recordid, receiverid, status) => {
//     try {
//             let finishDate = null;
//             if (status === 5){
//                 finishDate = new Date();
//             }
//             let updateRecord = await Record.findOne({where : {recordid: recordid}});
//             let result = await updateRecord.updateAttributes({
//                 receiverid : receiverid, 
//                 status: status,
//                 finishDate: finishDate
//             });
//             return result;
//     } catch (err) {
//         console.log(err);
//         throw new ServerError(400, err.message);
//     }
// };

// exports.dbDeleteById = async (Record, recordid) => {
//     try {
//         let record = await Record.findAll({ where: {recordid : recordid}, raw:true });
//         let result = await Record.destroy({ where: {recordid : recordid}, raw:true});
       
//         if (record.length === 0) {
//             throw new ServerError(400);
//         }
//         return record[0];
//     } catch (err) {
//         const message = err.errors.reduce((prev, { message }) => {
//             return `${prev}${message}; `;
//             }, '');
//         throw new ServerError(400, err.message);
//     }
// };
