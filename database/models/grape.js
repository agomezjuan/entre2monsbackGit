'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Grape extends Model {
    static associate(models) {
      Grape.belongsToMany(models.Wine, {
        through: 'WineGrape',
        as: 'wines',
        foreignKey: 'grapeId',
        otherKey: 'wineId'
      });
    }
  }

  Grape.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    grapeType: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Grape',
    tableName: 'grapes',
  });

  return Grape;
};
