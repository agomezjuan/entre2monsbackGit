// models/Price.js
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Price extends Model {
    static associate(models) {
      Price.belongsTo(models.Wine, {
        foreignKey: "wine_vintages_id",
        as: "wine",
      });
    }

    // Método para calcular el margen de beneficio
    calculateBenefitMargin() {
      if (this.purchase_price > 0) {
        return (
          ((this.sell_price - this.purchase_price) / this.purchase_price) * 100
        );
      }
      return 0;
    }
  }

  Price.init(
    {
      purchase_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de compra del vino",
      },
      sell_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: "Precio de venta del vino",
      },
      benefit_margin: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Margen de beneficio calculado en porcentaje",
      },
      wine_vintage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Price",
      tableName: "prices",
      timestamps: true,
      underscored: true,
      hooks: {
        beforeSave: (price) => {
          price.benefit_margin = price.calculateBenefitMargin();
        },
      },
    }
  );

  return Price;
};
