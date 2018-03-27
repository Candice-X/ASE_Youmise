'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    recordid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    senderid:{
      type: DataTypes.UUID,
      allowNull: false
    },
    receiverid:{
      type: DataTypes.UUID
    },
    cardid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    expireDate: {
      type: DataTypes.DATE
    },
    createDate:{
      type: DataTypes.DATE,
      allowNull: false
    },
    finishDate:{
      type: DataTypes.DATE
    },
    cardTitle:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cardContent:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.TINYINT,
        allowNull: false
    }
  });

  return Record;
}
