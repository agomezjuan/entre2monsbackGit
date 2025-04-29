const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define("Region", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  Region.associate = (models) => {
    Region.belongsTo(models.Country, {
      as: "country", // 👈 importante para el include
      foreignKey: "countryId",
    });

    Region.belongsToMany(models.DO, {
      through: "regions_dos",
      foreignKey: "region_id",
      otherKey: "do_id",
      as: "denominations",
    });
  };

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
