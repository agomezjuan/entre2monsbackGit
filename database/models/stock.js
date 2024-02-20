'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Wine, {
        foreignKey: 'wineId',
        as: 'wine'
      });
    }
  }

  Stock.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceRestaurant: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    priceEcommerce: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    priceCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      unique: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Stock',
    underscored: true
  });

  return Stock;
};
