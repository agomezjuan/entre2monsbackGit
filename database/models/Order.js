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
      wine_vintage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wines_vintages", // Referencia directa a la tabla intermedia
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
