'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cellar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con Wine
      Cellar.hasMany(models.Wine, {
        foreignKey: 'cellarId',
        as: 'wine'
      });
    }
  };
  //! Add cellar distance
  Cellar.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cellarName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    distance: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Cellar',
    underscored: true
  });
  return Cellar;
};
