"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WineVintagesGrapesStocksPrices extends Model {
    static associate(models) {
      WineVintagesGrapesStocksPrices.belongsToMany(models.WineVintage, {
        through: "wine_vintages_grapes_stocks_prices",
        foreignKey: "wineVintageId",
        as: "wineVintage",
        onDelete: "CASCADE",
      });

      WineVintagesGrapesStocksPrices.belongsToMany(models.Grape, {
        through: "wine_vintages_grapes_stocks_prices",
        foreignKey: "grapeId",
        as: "grape",
        onDelete: "CASCADE",
      });

      WineVintagesGrapesStocksPrices.belongsToMany(models.Stock, {
        through: "wine_vintages_grapes_stocks_prices",
        foreignKey: "stockId",
        as: "stock",
        onDelete: "CASCADE",
      });

      WineVintagesGrapesStocksPrices.belongsToMany(models.Price, {
        through: "wine_vintages_grapes_stocks_prices",
        foreignKey: "priceId",
        as: "price",
        onDelete: "CASCADE",
      });
    }
  }

  WineVintagesGrapesStocksPrices.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wineVintageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wines_vintages",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      grapeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "grapes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      stockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "stocks",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      priceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "prices",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "WineVintagesGrapesStocksPrices",
      tableName: "wine_vintages_grapes_stocks_prices",
      timestamps: true,
    }
  );

  return WineVintagesGrapesStocksPrices;
};
