'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Soil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Soil.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    soilType: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    effect: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Soil',
    tableName: 'soils',
  });
  return Soil;
};