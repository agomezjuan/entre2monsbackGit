const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    static associate(models) {
      Tenant.hasMany(models.User, { foreignKey: "tenantId", as: "users" });
    }
  }

  Tenant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Tenant",
      tableName: "tenants",
      timestamps: true,
      underscored: true,
    }
  );

  return Tenant;
};
