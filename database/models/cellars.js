'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cellars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cellars.hasMany(models.Wines, {
        foreignKey: 'cellar_id',
        as: 'wines'
      });
    }
  };
  Cellars.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cellar_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Celars',
  });
  return Cellars;
};