"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sulphite extends Model {
    static associate(models) {
      // Sulphite have many wines
      Sulphite.belongsToMany(models.Wine, {
        through: "wine_sulphites",
        foreignKey: "sulphiteId",
        otherKey: "wineId",
        as: "wines",
      });
    }
  }

  Sulphite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sulphiteMin: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      sulphiteMax: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Sulphite",
      tableName: "sulphites",
      timestamps: false,
    }
  );
  return Sulphite;
};
