"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    static associate(models) {
      Wine.belongsTo(models.Cellar, {
        foreignKey: "cellarId",
        as: "cellars",
      });

      Wine.belongsToMany(models.Vintage, {
        through: models.VintagesWinesStocks,
        foreignKey: "wineId",
        otherKey: "vintageId",
        as: "vintages",
      });

      Wine.belongsToMany(models.Icon, {
        through: "wines_icons",
        foreignKey: "wineId",
        otherKey: "iconId",
        as: "icons",
      });

      Wine.belongsToMany(models.Grape, {
        through: "wines_grapes",
        foreignKey: "wineId",
        otherKey: "grapeId",
        as: "grapes",
      });

      Wine.belongsToMany(models.Label, {
        through: "wines_labels",
        foreignKey: "wineId",
        otherKey: "labelId",
        as: "labels",
      });

      Wine.belongsTo(models.Sulphite, {
        foreignKey: "sulphiteId",
        as: "sulphites",
      });

      Wine.belongsTo(models.WineType, {
        foreignKey: "wineTypeId",
        as: "wineTypes",
      });
    }
  }

  Wine.init(
    {
      wine: {
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
      timestamps: false,
    }
  );

  return Wine;
};
