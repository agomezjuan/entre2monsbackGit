'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.Region, {
        foreignKey: 'countryId',
        as: 'regions',
      })
    }
  }
  Country.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      country: {
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
      modelName: 'Country',
      tableName: 'countries',
      timestamps: false,
    }
  )
  return Country
}
