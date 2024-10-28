const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.Region, {
        foreignKey: "countryId",
        as: "regions",
      });
    }
  }

  Country.init(
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
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      timestamps: true,
      underscored: true,
    }
  );

  return Country;
};
