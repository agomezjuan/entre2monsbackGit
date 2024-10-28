const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Region extends Model {
    static associate(models) {
      Region.belongsTo(models.Country, {
        foreignKey: "countryId",
        as: "country",
      });

      Region.belongsToMany(models.DO, {
        through: "RegionDO",
        foreignKey: "regionId",
        otherKey: "doId",
        as: "denominations",
      });

      Region.hasMany(models.SupplierAddress, {
        foreignKey: "regionId",
        as: "supplierAddresses",
      });
    }
  }

  Region.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "countries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Region",
      tableName: "regions",
      timestamps: true,
      underscored: true,
    }
  );

  return Region;
};
