// models/Order.js
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      // Relación con Customer
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });

      // Relación con Sale
      Order.belongsTo(models.Sale, {
        foreignKey: "sale_id",
        as: "sale",
      });

      // Relación con Wine
      Order.belongsTo(models.Wine, {
        foreignKey: "wine_id",
        as: "wine",
      });
    }
  }

  Order.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sales",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      wine_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wines",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
        comment: "Cantidad de vino consumida en la venta",
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
      underscored: true,
    }
  );

  return Order;
};
