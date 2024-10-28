const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SupplierDeliveryDetail extends Model {
    static associate(models) {
      // Relación muchos a muchos con Day
      SupplierDeliveryDetail.belongsToMany(models.Day, {
        through: "supplier_delivery_days",
        foreignKey: "supplierDeliveryDetailId",
        otherKey: "dayId",
        as: "days",
      });

      // Relación uno a uno con Supplier
      SupplierDeliveryDetail.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplier",
      });
    }
  }

  SupplierDeliveryDetail.init(
    {
      minPurchase: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
        comment: "Pedido mínimo requerido para evitar cargos de entrega",
      },
      deliveryTax: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
          checkScenario(value) {
            if (value > 0 && !this.minPurchase) {
              throw new Error(
                "deliveryTax no puede ser positivo si no hay minPurchase definido"
              );
            }
          },
        },
        comment:
          "Costo de entrega si no se cumple con el pedido mínimo, 0 si no aplica",
      },
    },
    {
      sequelize,
      modelName: "SupplierDeliveryDetail",
      tableName: "supplier_delivery_details",
      timestamps: true,
      underscored: true,
    }
  );

  return SupplierDeliveryDetail;
};
