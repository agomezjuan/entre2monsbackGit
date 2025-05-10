const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Tenant, { foreignKey: "tenantId", as: "tenant" });
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      userSurname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("admin", "business", "client"),
        defaultValue: "client",
        allowNull: false,
      },
      tenantId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tenants",
          key: "id",
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
