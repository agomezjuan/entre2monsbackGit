const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Vintage extends Model {
    static associate(models) {
      // Relación muchos a muchos con Wine a través de "wine_vintages"
      Vintage.belongsToMany(models.Wine, {
        through: "wine_vintages",
        foreignKey: "vintage_id",
        otherKey: "wine_id",
        as: "wines",
      });
    }
  }

  Vintage.init(
    {
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1800,
          max: new Date().getFullYear(),
        },
        comment: "Año de la cosecha o producción",
      },
    },
    {
      sequelize,
      modelName: "Vintage",
      tableName: "vintages",
      timestamps: true,
      underscored: true,
    }
  );

  return Vintage;
};
