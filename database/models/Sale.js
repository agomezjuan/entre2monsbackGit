const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Sale extends Model {
    static associate(models) {
      // Relación con Stock
      Sale.belongsTo(models.Stock, {
        foreignKey: "stock_id",
        as: "stock",
      });
      Sale.belongsToMany(models.Customer, {
        through: "Order",
        foreignKey: "sale_id",
        otherKey: "customer_id",
        as: "customers",
      });
    }
  }

  Sale.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
        comment: "Cantidad de unidades vendidas en esta transacción",
      },
      purchase_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de compra del producto en esta venta",
      },
      sale_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de venta del producto en esta venta",
      },
    },
    {
      sequelize,
      modelName: "Sale",
      tableName: "sales",
      timestamps: true,
      underscored: true,
    }
  );

  return Sale;
};
