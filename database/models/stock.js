"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    // one stock has one wine
    static associate(models) {
      Stock.belongsTo(models.Wine, {
        foreignKey: "wineId",
        as: "wine",
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
      amountIn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amountOut: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
