const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SupplierAddress extends Model {
    static associate(models) {
      SupplierAddress.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplier",
      });

      SupplierAddress.belongsTo(models.Region, {
        foreignKey: "regionId",
        as: "region",
      });
    }
  }

  SupplierAddress.init(
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isPostalCode(value) {
            const postalCodeRegex = /^[0-9]{4,10}$/;
            if (!postalCodeRegex.test(value)) {
              throw new Error("Invalid postal code format");
            }
          },
        },
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "suppliers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "regions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "SupplierAddress",
      tableName: "supplier_addresses",
      timestamps: true,
      underscored: true,
    }
  );

  return SupplierAddress;
};
