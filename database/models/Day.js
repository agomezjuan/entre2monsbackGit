const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Day extends Model {
    static associate(models) {
      // Relación muchos a muchos con SupplierDeliveryDetail
      Day.belongsToMany(models.SupplierDeliveryDetail, {
        through: "supplier_delivery_days",
        foreignKey: "dayId",
        otherKey: "supplierDeliveryDetailId",
        as: "deliveryOptions",
      });
    }
  }

  Day.init(
    {
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isIn: [
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
          ],
        },
        comment: 'Día de la semana, ej: "Monday"',
      },
    },
    {
      sequelize,
      modelName: "Day",
      tableName: "days",
      timestamps: false,
      underscored: true,
    }
  );

  return Day;
};
