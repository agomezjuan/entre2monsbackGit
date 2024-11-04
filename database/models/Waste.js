const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Waste extends Model {
    static associate(models) {
      // Relación con Stock
      Waste.belongsTo(models.Stock, {
        foreignKey: "stock_id",
        as: "stock",
      });
    }
  }

  Waste.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
        comment: "Cantidad de unidades desperdiciadas o perdidas",
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Razón de la pérdida, e.g., rotura, defecto",
      },
    },
    {
      sequelize,
      modelName: "Waste",
      tableName: "wastes",
      timestamps: true,
      underscored: true,
    }
  );

  return Waste;
};
