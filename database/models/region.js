const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Region extends Model {
    static associate(models) {
      Region.belongsToMany(models.DO, {
        through: "regions_dos",
        foreignKey: "region_id",
        otherKey: "do_id",
        as: "denominations",
      });
      Region.belongsTo(models.Country, {
        foreignKey: "countryId",
        as: "country",
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
        allowNull: false,
        references: {
          model: "countries",
          key: "id",
        },
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
