"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Soil extends Model {
    static associate(models) {
      // Cellar have many soils
      Soil.belongsToMany(models.Cellar, {
        through: "cellars_soils",
        foreignKey: "soilId",
        otherKey: "cellarId",
        as: "soils",
      });
    }
  }

  Soil.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      soil: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      effect: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Soil",
      tableName: "soils",
      timestamps: false,
    }
  );
  return Soil;
};
