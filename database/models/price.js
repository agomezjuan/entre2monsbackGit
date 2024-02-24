'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      Price.belongsTo(models.Stock, {
        foreignKey: 'stockId',
        as: 'stock',
      });
    }
  }
  Price.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      priceRestaurant: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      priceStore: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },  
      priceCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      stockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stocks', 
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Price',
      tableName: 'prices',
    }
  );
  return Price;
};
