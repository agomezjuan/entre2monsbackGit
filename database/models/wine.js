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
    otustanding: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cellarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cellar',
        key: 'id'
      }
    },
    grapeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Grape',
        key: 'id'
      }
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Icon',
        key: 'id'
      }
    },
    soilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Soil',
        key: 'id'
      }
    },  
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Region',
        key: 'id'
      }
    },
    wineTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'WineType',
        key: 'id'
      }
    },
    sulphiteId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sulphite',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Wine',
    tableName: 'wines',
  });

  return Wine;
};
