"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vintage extends Model {
    static associate(models) {
      Vintage.belongsToMany(models.Wine, {
        through: models.WineVintage,
        foreignKey: "vintageId",
        otherKey: "wineId",
        as: "wines",
      });

      Vintage.hasMany(models.WineVintage, {
        foreignKey: "vintageId",
        as: "wineVintageStocks",
      });
    }
  }

  Vintage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      vintage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Vintage",
      tableName: "vintages",
      timestamps: true,
    }
  );

  return Vintage;
};
