const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Supplier extends Model {
    static associate(models) {
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
        validate: {
          notEmpty: true,
        },
      },
      legalName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nif: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEuropeanTaxId(value) {
            const europeanVatRegex = /^[A-Z]{2}[A-Z0-9]{8,12}$/;
            if (!europeanVatRegex.test(value)) {
              throw new Error("Invalid European VAT number format");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
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
        validate: {
          isUrl: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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

  return Supplier;
};
