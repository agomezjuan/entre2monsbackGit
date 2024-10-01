"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      // Orders have many customers
      Orders.belongsTo(models.Customer, {
        foreignKey: "customerId",
        as: "customers",
      });

      // Orders have many wines
      Orders.belongsToMany(models.Wine, {
        foreignKey: "orderId",
        through: "order_wines",
        as: "wines",
      });
    }
  }

  Orders.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "id",
        },
      },
      wineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wines",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );

  return Orders;
};
