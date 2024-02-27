'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Sulphite extends Model {
    static associate(models) {

      // Sulphite have many wines
      Sulphite.belongsToMany(models.Wine, {
        through: 'wine_sulphites',
        foreignKey: 'sulphiteId',
        otherKey: 'wineId',
        as: 'wines',
      })
    }
  }

  /* 
    ! sulphite: DATA TYPE STRING
  */

  Sulphite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sulphite: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Sulphite',
      tableName: 'sulphites',
      timestamps: false,
    }
  )
  return Sulphite
}