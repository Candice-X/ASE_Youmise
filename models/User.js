'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://s3.us-east-2.amazonaws.com/umisefrontendimages/girl.png",
    },
    gender:{
      type: DataTypes.ENUM('Male', 'Female')
    },
    facebookid:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
  });

  User.associate = function(models) {
    // user as sender of a message
    User.hasMany(models.Friendship, {
      foreignKey: 'uid',
      sourceKey: 'userId',
      onDelete: 'cascade'
    });

    User.hasMany(models.FriendRequest, {
      foreignKey: 'uid',
      sourceKey: 'receiverId',
      onDelete: 'cascade',
    });


  };

  return User;
}
