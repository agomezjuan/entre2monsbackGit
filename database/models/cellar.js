"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cellar extends Model {
    static associate(models) {
      // Cellar have many suppliers
      Cellar.belongsToMany(models.Supplier, {
        foreignKey: "cellarId",
        through: "cellar_suppliers",
        as: "suppliers",
      });

      // Cellar have many wines
      Cellar.belongsTo(models.Region, {
        foreignKey: "regionId",
        as: "regions",
      });

      // Cellar have many soils
      Cellar.belongsToMany(models.Soil, {
        through: "cellar_soils",
        foreignKey: "cellarId",
        as: "soils",
      });
    }
  }

  Cellar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cellar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      distance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "regions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cellar",
      tableName: "cellars",
    }
  );
  return Cellar;
};
