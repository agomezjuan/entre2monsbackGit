"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      Price.belongsTo(models.WineVintagesGrapesStocksPrices, {
        trough: "wine_vintages_grapes_stocks_prices",
        foreignKey: "wineVintageId",
        as: "wineVintage",
        onDelete: "CASCADE",
      });
    }
  }

  Price.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      purchasePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      salePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Price",
      tableName: "prices",
      timestamps: true,
    }
  );

  return Price;
};
