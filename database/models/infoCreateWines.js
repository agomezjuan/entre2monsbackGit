'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class InfoCreateWine extends Model {}

  InfoCreateWine.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    helpText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'InfoCreateWine',
    tableName: 'infoCreateWines',
    timestamps: false
  });

  return InfoCreateWine;
};