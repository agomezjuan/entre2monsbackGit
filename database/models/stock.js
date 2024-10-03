"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    // one stock has one wine
    static associate(models) {
      Stock.hasOne(models.Wine, {
        foreignKey: "stockId",
        as: "wine",
      });

      Stock.belongsTo(models.Price, {
        foreignKey: "priceId",
        as: "prices",
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
      priceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "prices",
          key: "id",
        },
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
