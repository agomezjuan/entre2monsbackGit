const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SupplierDelivery extends Model {
    static associate(models) {
      // Relación uno a uno con Supplier
      SupplierDelivery.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplier",
      });

      // Relación muchos a muchos con DeliveryDay
      SupplierDelivery.belongsToMany(models.DeliveryDay, {
        through: "supplier_delivery_days",
        foreignKey: "supplierDeliveryId",
        otherKey: "deliveryDayId",
        as: "deliveryDays",
      });
    }
  }

  SupplierDelivery.init(
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
      modelName: "SupplierDelivery",
      tableName: "supplier_deliveries",
      timestamps: true,
      underscored: true,
    }
  );

  return SupplierDelivery;
};
