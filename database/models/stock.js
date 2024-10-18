"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.WineVintage, {
        foreignKey: "wineVintageId",
        as: "wineVintage",
      });
    }
  }

  Stock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      quantityIn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantityOut: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wineVintageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintage",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Stock",
      tableName: "stocks",
      timestamps: true,
    }
  );

  return Stock;
};
