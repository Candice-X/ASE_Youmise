const ServerError = require('../../utils/ServerError');
const config = require('../../config');
// var moment = require('moment');

exports.dbCreateRecord = async (Record, senderid, receiverid, cardid, expireDate, cardContent, cardTitle) => {
    try{
        let result;
        let status = 1;
        if (!receiverid){ 
            status = 2;
        }
        let createDate = new Date();
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
        // const message = err.errors.reduce((prev, { message }) => {
        // return `${prev}${message}; `;
        // }, '');
        throw new ServerError(400, err.message);
    }
}
exports.dbFetchAll = async (Record) => {
    try {
      const result = await Record.findAll({ raw: true });
        if (!result){
          console.log('There is no record in Record Table.');
        } else {
            console.log('Successfully find all recors.');
            return result;
        }
    } catch (err) {
      throw new ServerError(400, err);
    }
  };

exports.dbFindById = async (Record, recordid) => {
    try {
        const record = await Record.findAll({ where: { recordid: recordid }, raw: true });
        if (record.length === 0) {
            throw new ServerError(400, err.message);
        } else {
            console.log(`Successfully find card: ${JSON.stringify(record[0])}`);
            return record[0];
        }
    } catch (err) {
        throw new ServerError(400, err.message);
    }
  };

  exports.dbFindBySender = async (Record, senderid, status) => {
    try {
        let records;
        if (status === null){
            records = await Record.findAll({ where: { senderid: senderid}, raw: true });
        } else {
            records = await Record.findAll({ where: { senderid: senderid, status: status}, raw: true });
        }
        if (!records) {
            console.log('record not exists.')
        } else {
            console.log(`Successfully find ${records.length} matching records.`);
            return records;
        }
    } catch (err) {
        console.log(err.message);
        throw new ServerError(400, err.message);
    }
  };

exports.dbFindByReceiver = async (Record, receiverid, status) => {
try {
    let records;
    if (status === null){
        records = await Record.findAll({ where: { receiverid: receiverid}, raw: true });
    } else {
        records = await Record.findAll({ where: { receiverid: receiverid, status: status}, raw: true });
    }
    if (!records) {
        console.log('record not exists.')
    } else {
        console.log(`Successfully find ${records.length} matching records.`);
        return records;
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
