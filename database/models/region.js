'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {

      // A region belongs to a country
      Region.belongsTo(models.Country, {
        foreignKey: 'countryId',
        as: 'country',
      })

      // A region has many cellars
      Region.hasMany(models.Cellar, {
        foreignKey: 'regionId',
        as: 'cellars',
      })
    }
  }
  Region.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        }
      },
    },
    {
      sequelize,
      modelName: 'Region',
      tableName: 'regions',
      timestamps: false,
    }
  )
  return Region
}