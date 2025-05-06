const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Day extends Model {
    static associate(models) {
      Day.belongsToMany(models.SupplierDeliveryDetail, {
        through: "supplier_delivery_days",
        foreignKey: "day_id",
        otherKey: "supplier_delivery_detail_id",
        as: "deliveryDetails", // Asegúrate de que el alias sea "deliveryDetails"
      });
    }
  }

  Day.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
