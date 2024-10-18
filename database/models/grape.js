"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Grape extends Model {
    static associate(models) {
      Grape.belongsToMany(models.WineVintage, {
        through: "wine_vintage_grape",
        foreignKey: "grapeId",
        otherKey: "wineVintageId",
        as: "wineVintages",
      });
    }
  }

  Grape.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      grape: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Grape",
      tableName: "grapes",
      timestamps: true,
    }
  );

  return Grape;
};
