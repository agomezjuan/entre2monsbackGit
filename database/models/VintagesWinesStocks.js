"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VintagesWinesStocks extends Model {
    static associate(models) {
      // Definir asociaciones aquí, si es necesario
    }
  }

  VintagesWinesStocks.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vintageId: {
        type: DataTypes.INTEGER,
        references: { model: "vintages", key: "id" },
        onDelete: "CASCADE",
      },
      wineId: {
        type: DataTypes.INTEGER,
        references: { model: "wines", key: "id" },
        onDelete: "CASCADE",
      },
      stockId: {
        type: DataTypes.INTEGER,
        references: { model: "stocks", key: "id" },
        onDelete: "CASCADE",
      },
      priceId: {
        type: DataTypes.INTEGER,
        references: { model: "prices", key: "id" },
        onDelete: "CASCADE",
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
      modelName: "VintagesWinesStocks",
      tableName: "VintagesWinesStocks",
      timestamps: true,
    }
  );

  return VintagesWinesStocks;
};
