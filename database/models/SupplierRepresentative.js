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
        allowNull: false,
        references: {
          model: "suppliers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "SupplierRepresentative",
      tableName: "suppliers_representatives",
      timestamps: true,
      underscored: true,
    }
  );

  return SupplierRepresentative;
};
