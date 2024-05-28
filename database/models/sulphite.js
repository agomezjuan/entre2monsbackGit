"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sulphite extends Model {
    static associate(models) {
      // Sulphite have many wines
      Sulphite.hasMany(models.Wine, {
        foreignKey: "sulphiteId",
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
