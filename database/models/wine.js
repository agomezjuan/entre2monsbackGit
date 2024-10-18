"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    static associate(models) {
      Wine.belongsTo(models.Cellar, {
        foreignKey: "cellarId",
        as: "cellar",
      });

      Wine.belongsToMany(models.Vintage, {
        through: models.WineVintage, // Requiere el modelo `WineVintage`
        foreignKey: "wineId",
        otherKey: "vintageId",
        as: "vintages",
      });

      Wine.belongsToMany(models.Icon, {
        through: "wine_icons", // Cambiado para seguir convención de plural
        foreignKey: "wineId",
        otherKey: "iconId",
        as: "icons",
      });

      Wine.belongsToMany(models.Label, {
        through: "wine_labels", // Cambiado para seguir convención de plural
        foreignKey: "wineId",
        otherKey: "labelId",
        as: "labels",
      });

      Wine.belongsTo(models.Sulphite, {
        foreignKey: "sulphiteId",
        as: "sulphite",
      });

      Wine.belongsTo(models.WineType, {
        foreignKey: "wineTypeId",
        as: "wineType",
      });
    }
  }

  Wine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      production: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vineyardAltitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tastingNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cellarId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
      },
      wineTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wineTypes",
          key: "id",
        },
      },
      sulphiteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sulphites",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Wine",
      tableName: "wines",
      timestamps: true,
    }
  );

  return Wine;
};
