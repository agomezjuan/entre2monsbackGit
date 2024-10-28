const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SaleDetail extends Model {
    static associate(models) {
      // Relación con Sale
      SaleDetail.belongsTo(models.Sale, {
        foreignKey: "saleId",
        as: "sale",
      });
      // Relación con Stock
      SaleDetail.belongsTo(models.Stock, {
        foreignKey: "stockId",
        as: "stock",
      });
    }
  }

  SaleDetail.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
        comment: "Cantidad de unidades vendidas en esta transacción",
      },
      purchasePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de compra del producto en esta venta",
      },
      salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de venta del producto en esta venta",
      },
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sales",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      stockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "stocks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "SaleDetail",
      tableName: "sale_details",
      timestamps: true,
      underscored: true,
    }
  );

  return SaleDetail;
};
