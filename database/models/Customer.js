// models/Customer.js
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsToMany(models.Sale, {
        through: "Order",
        foreignKey: "customer_id",
        otherKey: "sale_id",
        as: "sales",
      });
    }
  }

  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      surnames: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Información adicional o preferencias del cliente",
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      timestamps: true,
      underscored: true,
    }
  );

  return Customer;
};
