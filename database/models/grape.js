'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Grape extends Model {
    static associate(models) {
      
      // A grape has many wines
      Grape.hasMany(models.Wine, {
        foreignKey: 'grapeId',
        as: 'wines',
      })
    }
  }
  Grape.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      grape: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Grape',
      tableName: 'grapes',
      timestamps: false,
    }
  )
  return Grape
}