"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Orders belong to a Customer (uno a muchos)
      Order.belongsTo(models.Customer, {
        foreignKey: "customerId",
        as: "customer",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Orders have many Wines (many-to-many)
      Order.belongsToMany(models.Wine, {
        foreignKey: "orderId",
        through: "order_wines", // Tabla intermedia para many-to-many
        as: "wines",
      });
    }
  }

  Order.init(
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
        defaultValue: DataTypes.NOW,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers", // Tabla 'customers'
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "orders", // Asegúrate de que el nombre de la tabla esté definido
      timestamps: true,
    }
  );

  return Order;
};
