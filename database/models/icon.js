'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Icon extends Model {
    static associate(models) {
      // An icon has many wines
      Icon.hasMany(models.Wine, {
        foreignKey: 'iconId',
        as: 'wines',
      })
    }
  }
  Icon.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
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
      modelName: 'Icon',
      tableName: 'icons',
      timestamps: false,
    }
  )
  return Icon
}