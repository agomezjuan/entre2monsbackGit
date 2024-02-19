'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    static associate(models) {
      // Define la relación muchos a muchos con Grape
      Wine.belongsToMany(models.Grape, {
        through: 'WineGrape',
        as: 'grapes',
        foreignKey: 'wineId',
        otherKey: 'grapeId'
      });
      // Define la relación muchos a muchos con Icon
      Wine.belongsToMany(models.Icon, {
        through: 'WineIcon',
        as: 'icons',
        foreignKey: 'wineId',
        otherKey: 'iconId'
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
        model: 'Cellars', // Asegúrate de que el nombre de la tabla esté en plural
        key: 'id'
      }
    },
    soilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Soils', // Asegúrate de que el nombre de la tabla esté en plural
        key: 'id'
      }
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Countries', // Asegúrate de que el nombre de la tabla esté en plural
        key: 'id'
      }
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Regions', // Asegúrate de que el nombre de la tabla esté en plural
        key: 'id'
      }
    },
    wineTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'WineTypes', // Asegúrate de que el nombre de la tabla esté en plural
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Wine',
    tableName: 'Wines', // Asegúrate de que el nombre de la tabla esté en plural
    underscored: true,
  });

  return Wine;
};
