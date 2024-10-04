"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LabelFamily extends Model {
    static associate(models) {
      LabelFamily.hasMany(models.Label, {
        foreignKey: "labelFamilyId",
        as: "labels",
      });
    }
  }
  LabelFamily.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      labelFamily: {
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
      modelName: "LabelFamily",
      tableName: "labelFamilies",
      timestamps: false,
    }
  );
  return LabelFamily;
};
