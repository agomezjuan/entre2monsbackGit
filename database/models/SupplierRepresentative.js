const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class SupplierRepresentative extends Model {
    static associate(models) {
      SupplierRepresentative.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplier",
      });
    }
  }

  SupplierRepresentative.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
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
        validate: {
          is: /^\+?[\d\s]+$/,
        },
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "suppliers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "SupplierRepresentative",
      tableName: "supplier_representatives",
      timestamps: true,
      underscored: true,
    }
  );

  return SupplierRepresentative;
};
