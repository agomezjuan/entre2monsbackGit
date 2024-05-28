"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    static associate(models) {
      // relacion de muchos a uno con cellar donde un cellar tine muchos vinos
      Wine.belongsTo(models.Cellar, {
        foreignKey: "cellarId",
        as: "cellars",
      });

      // relacion de uno a uno con stock donde un vino tiene un stock
      Wine.hasOne(models.Stock, {
        foreignKey: "wineId",
        as: "stock",
      });

      Wine.hasOne(models.Price, {
        foreignKey: "wineId",
        as: "price",
      });

      // wine has many grapes
      Wine.belongsToMany(models.Grape, {
        through: "wines_grapes",
        foreignKey: "wineId",
        otherKey: "grapeId",
        as: "grapes",
      });

      // wine has many icons
      Wine.belongsToMany(models.Icon, {
        through: "wines_icons",
        foreignKey: "wineId",
        otherKey: "iconId",
        as: "icons",
      });

      // wine has many wineTypes
      Wine.belongsTo(models.WineType, {
        otherKey: "wineTypeId",
        as: "wineType",
      });

      //wine has one sulphite
      Wine.belongsTo(models.Sulphite, {
        otherKey: "sulphiteId",
        as: "sulphites",
      });

      Wine.belongsToMany(models.Label, {
        through: "wines_labels",
        foreignKey: "wineId",
        otherKey: "labelId",
        as: "labels",
      });
    }
  }
  Wine.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      wine: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      cellarId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
      },
      stockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "stocks",
          key: "id",
        },
      },

      priceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "prices",
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

      wineTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wineTypes",
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
