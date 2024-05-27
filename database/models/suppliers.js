"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    //supplier has many cellars
    static associate(models) {
      Supplier.belongsToMany(models.Cellar, {
        foreignKey: "supplierId",
        as: "cellars",
        through: "cellar_supplier",
      });
    }
  }
  Supplier.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fiscalName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      NIF: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CP: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      businessPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      businessEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Supplier",
      tableName: "suppliers",
      timestamps: false,
    }
  );
  return Supplier;
};
