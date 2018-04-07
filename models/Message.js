'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    messageid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    senderid:{
      type: DataTypes.UUID,
      allowNull: false
    },
    receiverid:{
      type: DataTypes.UUID,
      allowNull: false
    },
    recordid:{
      type: DataTypes.UUID,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    msgContent: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  return Message;
}
