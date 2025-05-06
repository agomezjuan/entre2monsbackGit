const { Model, DataTypes } = require("sequelize");
const { afterSupplierUpdate } = require("../hooks/supplierHooks");

module.exports = (sequelize, Sequelize) => {
  class Supplier extends Model {
    static associate(models) {
      Supplier.belongsToMany(models.Cellar, {
        through: "cellars_suppliers",
        foreignKey: "supplier_id",
        otherKey: "cellar_id",
        as: "cellars",
      });

      Supplier.hasMany(models.SupplierAddress, {
        foreignKey: "supplierId",
        as: "addresses",
      });

      Supplier.hasMany(models.SupplierRepresentative, {
        foreignKey: "supplierId",
        as: "representatives",
      });

      Supplier.hasOne(models.SupplierDeliveryDetail, {
        foreignKey: "supplierId",
        as: "deliveryDetail",
      });
    }
  }

  Supplier.init(
    {
      tradeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      legalName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nif: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEuropeanTaxId(value) {
            const regex = /^[A-Z]{2}[A-Z0-9]{8,12}$/;
            if (!regex.test(value)) {
              throw new Error("Invalid European VAT number format");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          is: /^\+?[\d\s]+$/,
        },
      },
      web: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: { isUrl: true },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Supplier",
      tableName: "suppliers",
      timestamps: true,
      underscored: true,
    }
  );

  Supplier.addHook("afterUpdate", afterSupplierUpdate);

  return Supplier;
};
