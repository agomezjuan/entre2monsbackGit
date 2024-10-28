const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Sale extends Model {
    static associate(models) {
      // Relación con Stock
      Sale.belongsTo(models.Stock, {
        foreignKey: "stockId",
        as: "stock",
      });
      // Relación con SaleDetails
      Sale.hasMany(models.SaleDetail, {
        foreignKey: "saleId",
        as: "saleDetails",
      });
    }
  }

  Sale.init(
    {
      totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment: "Unidades vendidas en esta venta",
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "Fecha de la transacción de venta",
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
      modelName: "Sale",
      tableName: "sales",
      timestamps: true,
      underscored: true,
    }
  );

  return Sale;
};
