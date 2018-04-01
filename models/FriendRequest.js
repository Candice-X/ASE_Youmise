'use strict';
module.exports = (sequelize, DataTypes) => {
  const FriendRequest = sequelize.define('friendRequest', {
    friendRequestId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // types:{
    //   type: DataTypes.TINYINT,
    //   allowNull: false,
    //   validate: {
    //     isNumeric: true
    //   }
    // },
    // messageInfo: {
    //   type: DataTypes.STRING,
    // },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    senderUsername: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiverUsername: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    status: {
      type: DataTypes.ENUM('SENT', 'APPROVED', 'REJECTED'),
      defaultValue: 'SENT',
      allowNull: false,
    },
  });

  FriendRequest.associate = function (models) {
    models.FriendRequest.belongsTo(models.User, {
      as: 'receiver',
      targetKey: 'receiverId',
    });
  }

  return FriendRequest;
}
