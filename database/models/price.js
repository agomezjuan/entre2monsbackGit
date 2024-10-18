"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      Price.belongsTo(models.WineVintage, {
        foreignKey: "wineVintageId",
        as: "wineVintage",
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
      modelName: "Price",
      tableName: "prices",
      timestamps: true,
    }
  );

  return Price;
};
