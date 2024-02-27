'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class WineType extends Model {
    static associate(models) {
      
      // A wine type has many wines
      WineType.hasMany(models.Wine, {
        foreignKey: 'wineTypeId',
        as: 'wines',
      })
    }
  }
  WineType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wineType: {
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
      modelName: 'WineType',
      tableName: 'wineTypes',
      timestamps: false,
    }
  )
  return WineType
}
  