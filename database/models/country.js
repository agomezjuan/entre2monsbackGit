const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define("Country", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  Country.associate = (models) => {
    Country.hasMany(models.Region, {
      as: "regions",
      foreignKey: "countryId",
    });
  };

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
