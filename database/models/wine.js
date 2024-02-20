'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Wine extends Model {
    static associate(models) {
      Wine.belongsToMany(models.Grape, {
        through: 'wines_grapes',
        as: 'grapes',
        foreignKey: 'wineId',
        otherKey: 'grapeId'
      });
      Wine.belongsToMany(models.Icon, {
        through: 'wines_icons',
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
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    vintage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vineyardAlttitude: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    production:{
      type: DataTypes.STRING,
    },
    cellarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cellars',
        key: 'id'
      }
    },
    grapeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'grapes',
        key: 'id'
      }
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'icons',
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
    },
    sulphiteId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sulphites',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Wine',
    tableName: 'wines',
    underscored: true,
  });

  return Wine;
};
