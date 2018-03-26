'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    cardid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    types:{
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    cardName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    cardImgURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNote: {
      type: DataTypes.STRING
    }
  });

  return Card;
}
