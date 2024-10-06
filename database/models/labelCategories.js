"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LabelCat extends Model {
    static associate(models) {
      LabelCat.hasMany(models.Label, {
        foreignKey: "labelsCategoriesId",
        as: "labels",
      });
    }
  }

  LabelCat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "LabelCat",
      tableName: "labelCats",
      timestamps: false,
    }
  );
  return LabelCat;
};
