'use strict';

const { Model } = require('sequelize');
/*
  !Outstandig is required 
*/

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      
      // one stock has one price
      Stock.belongsTo(models.Price, {
        foreignKey: 'priceId',
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
      priceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'prices',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      tableName: 'stocks',
      timestamps: false,  
    }
  );
  return Stock;
};
