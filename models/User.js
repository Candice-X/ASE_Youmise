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
    // image: {
    //   type: DataTypes.STRING,
    // },
    gender:{
      type: DataTypes.ENUM('Male', 'Female')
    }
  });

  User.associate = function(models) {
    // user as sender of a message
    models.User.hasMany(models.FriendRequest, {
      foreignKey: 'uid',
      sourceKey: 'receiverId',
      onDelete: 'cascade',
    });
  };

  return User;
}

// User.belongsToMany(User, { as: 'friend', through: 'Userfriend' })
