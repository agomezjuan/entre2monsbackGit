"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vintage extends Model {
    static associate(models) {
      Vintage.belongsToMany(models.Wine, {
        through: "vintages_wines",
        foreignKey: "vintageId",
        otherKey: "wineId",
        as: "wines",
      });

      Vintage.belongsToMany(models.Grape, {
        through: "vintages_grapes",
        foreignKey: "vintageId",
        otherKey: "grapeId",
        as: "grapes",
      });
    }
  }

  Vintage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      vintage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Vintage",
      tableName: "vintages",
      timestamps: false,
    }
  );

  return Vintage;
};
