"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.WineVintage, {
        foreignKey: "wineVintageId",
        as: "wineVintage",
        onDelete: "CASCADE",
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
        validate: {
          isInt: true,
          min: 0,
        },
      },
      quantityOut: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
          max(value) {
            if (value > this.quantityIn) {
              throw new Error(
                "La cantidad saliente no puede exceder la cantidad entrante."
              );
            }
          },
        },
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
