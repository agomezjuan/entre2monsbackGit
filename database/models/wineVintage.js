"use strict";
const { Model } = require("sequelize");

// Asegúrate de importar correctamente los modelos Wine y Vintage
module.exports = (sequelize, DataTypes) => {
  const Wine = sequelize.models.Wine; // Asegúrate de que el modelo Wine esté disponible
  const Vintage = sequelize.models.Vintage; // Asegúrate de que el modelo Vintage esté disponible

  class WineVintage extends Model {
    static associate(models) {
      // Asociación con Wine
      WineVintage.belongsTo(models.Wine, {
        foreignKey: "wineId",
        as: "wine",
        onDelete: "CASCADE",
      });

      // Asociación con Vintage
      WineVintage.belongsTo(models.Vintage, {
        foreignKey: "vintageId",
        as: "vintage",
        onDelete: "CASCADE",
      });

      // Asociación con Stock
      WineVintage.hasOne(models.Stock, {
        foreignKey: "wineVintageId",
        as: "stock",
      });

      WineVintage.hasOne(models.Price, {
        foreignKey: "wineVintageId",
        as: "price",
      });
    }
  }

  WineVintage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vintageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "WineVintage",
      tableName: "wine_vintages",
      timestamps: true,
    }
  );

  return WineVintage;
};
