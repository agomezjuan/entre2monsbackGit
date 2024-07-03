"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vintage extends Model {
    static associate(models) {
      Vintage.belongsTo(models.Wine, {
        foreignKey: "wineId",
        as: "wine",
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
      wineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wines",
          key: "id",
        },
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
