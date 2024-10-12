"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      // one price has one stock
      Price.hasOne(models.Stock, {
        foreignKey: "priceId",
        as: "prices",
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
      costPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sellPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Se rellena automáticamente con la fecha actual
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Price",
      tableName: "prices",
      timestamps: true, // Activa timestamps automáticos
    }
  );

  return Price;
};
