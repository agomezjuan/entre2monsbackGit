'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wines.belongsToMany(models.Grapes, {
        through: 'WinesGrapes',
    })
    }
  };
  Wines.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    wine_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cellar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cellars',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Soils',
  });
  return Soils;
};