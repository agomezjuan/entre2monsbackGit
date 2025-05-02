const { Model, DataTypes } = require("sequelize");
const { afterRegionUpdate } = require("../hooks/regionHooks");

module.exports = (sequelize) => {
  class Region extends Model {
    static associate(models) {
      Region.belongsTo(models.Country, {
        as: "country",
        foreignKey: "countryId",
      });

      Region.belongsToMany(models.DO, {
        through: "regions_dos",
        foreignKey: "region_id",
        otherKey: "do_id",
        as: "denominations",
      });
    }
  }

  Region.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "countries",
          key: "id",
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

  Region.addHook("afterUpdate", afterRegionUpdate);

  return Region;
};
