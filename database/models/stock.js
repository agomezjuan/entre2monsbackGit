'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.hasOne(models.Price, {
        foreignKey: 'stockId',
        as: 'price',
      });
    }
  }
  Stock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      amountIn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amountOut: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      tableName: 'stocks',
    }
  );
  return Stock;
};
