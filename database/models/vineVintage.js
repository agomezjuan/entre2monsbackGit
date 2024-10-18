"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WineVintage extends Model {
    static associate(models) {
      WineVintage.belongsTo(models.Wine, {
        foreignKey: "wineId",
        as: "wine",
      });
      WineVintage.belongsTo(models.Vintage, {
        foreignKey: "vintageId",
        as: "vintage",
      });
      WineVintage.belongsToMany(models.Grape, {
        through: "wine_vintage_grape",
        foreignKey: "wineVintageId",
        otherKey: "grapeId",
        as: "grapes",
      });
    }
  }

  WineVintage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wines",
          key: "id",
        },
      },
      vintageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "vintages",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "WineVintage",
      tableName: "wine_vintage",
      timestamps: true,
    }
  );

  return WineVintage;
};
