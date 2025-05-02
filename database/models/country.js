const { Model, DataTypes } = require("sequelize");
const { afterCountryUpdate } = require("../hooks/countryHooks");

module.exports = (sequelize) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.Region, {
        as: "regions",
        foreignKey: "countryId",
      });
    }
  }

  Country.init(
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      timestamps: true,
      underscored: true,
    }
  );

  // ✅ Activar hook externo
  Country.addHook("afterUpdate", afterCountryUpdate);

  return Country;
};
