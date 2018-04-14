'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friendship = sequelize.define('friendship', {
    friendshipId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    friendId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Friendship.associate = function (models) {
    models.Friendship.belongsTo(models.User, {
      as: 'user',
      targetKey: 'userId',
    });
  }

  return Friendship;
}
