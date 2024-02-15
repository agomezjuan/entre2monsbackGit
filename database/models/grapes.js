'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grapes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grapes.belongsToMany(models.Wines, {
        through: 'WineGrapes', // Sequelize creará automáticamente esta tabla
        foreignKey: 'grapeId',
        otherKey: 'wineId'
  });
}
  };
  Grapes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    grape_type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Grapes',
  });
  return Grapes;
};