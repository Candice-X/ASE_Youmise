const ServerError = require('../../utils/ServerError');
const config = require('../../config');
var moment = require('moment');

exports.dbCreateRecord = async (Record, senderid, receiverid, cardid, expireDate, cardContent, cardTitle) => {
    let result;
    let status = 1;
    if (!receiverid){ 
        status = 2;
    }
    let createDate = moment();
    if (!receiver) {
        receiver = null
    }
    try{
        let raw = await Record.create({
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
        const message = err.errors.reduce((prev, { message }) => {
        return `${prev}${message}; `;
        }, '');
        throw new ServerError(400, message);
    }
}

exports.dbFindById = async (Record, recordid) => {
    try {
        const record = await Record.findOne({ where: { recordid: recordid } });
        if (!record) {
            console.log('Id not exists in db.')
        } else {
            console.log(`Successfully find card: ${record}`);
            return record;
        }
    } catch (err) {
        const message = err.errors.reduce((prev, { message }) => {
            return `${prev}${message}; `;
          }, '');
        throw new ServerError(400, message);
    }
  };

  exports.dbFindBySender = async (Record, senderid, status) => {
    try {
        const records = await Record.findOne({ where: { senderid: senderid, status: status} });
        if (!records) {
            console.log('record not exists.')
        } else {
            console.log(`Successfully find ${records.length} matching records.`);
            return records;
        }
    } catch (err) {
        const message = err.errors.reduce((prev, { message }) => {
            return `${prev}${message}; `;
          }, '');
        throw new ServerError(400, message);
    }
  };

exports.dbUpdateById = async (record, recordid, receiverid, status) => {
    try {
            let finishDate = null;
            if (status === 5){
                let finishedDate = moment();
            }
            let result = await record.updateAttributes({
                receiverid : receiver, 
                status: status,
                finishDate: finishDate
            });
            console.log(`Update successfully, ${result}`);
            return result;
    } catch (err) {
        const message = err.errors.reduce((prev, { message }) => {
            return `${prev}${message}; `;
            }, '');
        throw new ServerError(400, err.message);
    }
};

exports.dbDeleteById = async (Record, recordid) => {
    try {
        let result = await Record.destroy({ where: {recordid : recordid}});
        console.log(`Delete successfully, ${result}`);
        return Record.findAll();
    } catch (err) {
        const message = err.errors.reduce((prev, { message }) => {
            return `${prev}${message}; `;
            }, '');
        throw new ServerError(400, err.message);
    }
};

