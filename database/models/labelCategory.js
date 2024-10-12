"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LabelCategory extends Model {
    static associate(models) {
      LabelCategory.hasMany(models.Label, {
        foreignKey: "labelCategoryId",
        as: "labels",
      });
    }
  }

  LabelCategory.init(
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
      modelName: "LabelCategory",
      tableName: "labelsCategories",
      timestamps: false,
    }
  );
  return LabelCategory;
};
