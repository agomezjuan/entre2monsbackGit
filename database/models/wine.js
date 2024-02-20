'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Wine extends Model {
    static associate(models) {
      Wine.belongsToMany(models.Grape, {
        through: 'WineGrape',
        as: 'grapes',
        foreignKey: 'wineId',
        otherKey: 'grapeId'
      });
      Wine.belongsToMany(models.Icon, {
        through: 'WineIcon',
        as: 'icons',
        foreignKey: 'wineId',
        otherKey: 'iconId'
      });
      Wine.hasOne(models.Stock, {
        foreignKey: 'wineId',
        as: 'stock'
      });
    }
  }

  Wine.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    wineName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    vintage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cellarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cellars',
        key: 'id'
      }
    },
    soilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'soils',
        key: 'id'
      }
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'regions',
        key: 'id'
      }
    },
    wineTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'wineTypes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Wine',
    tableName: 'wines',
    underscored: true,
  });

  return Wine;
};
