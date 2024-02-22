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
    price_restaurant: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    price_ecommerce: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    price_cost: {
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
    tableName: 'stocks',
  });

  return Stock;
};
