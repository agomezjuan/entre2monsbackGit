"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vintage extends Model {
    static associate(models) {
      Vintage.belongsToMany(models.Grape, {
        through: "vintages_grapes",
        foreignKey: "vintageId",
        otherKey: "grapeId",
        as: "grapes",
      });

      Vintage.belongsToMany(models.Wine, {
        through: "VintagesWinesStocks",
        foreignKey: "vintageId",
        otherKey: "wineId",
        as: "wines",
      });

      Vintage.belongsToMany(models.Stock, {
        through: "VintagesWinesStocks",
        foreignKey: "vintageId",
        otherKey: "stockId",
        as: "stocks",
      });

      Vintage.belongsToMany(models.Price, {
        through: "VintagesWinesStocks",
        foreignKey: "vintageId",
        otherKey: "priceId",
        as: "prices",
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
      timestamps: false,
    }
  );

  return Vintage;
};
