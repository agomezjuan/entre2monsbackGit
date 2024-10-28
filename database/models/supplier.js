const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Supplier extends Model {
    static associate(models) {
      Supplier.belongsTo(models.SupplierAddress, {
        foreignKey: "addressId",
        as: "address",
      });

      Supplier.hasMany(models.SupplierRepresentative, {
        foreignKey: "supplierId",
        as: "representatives",
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
          is: /^\+?[\d\s]+$/, // Matches "+123 456 789"
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
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "supplier_addresses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      representativeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "representatives",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
