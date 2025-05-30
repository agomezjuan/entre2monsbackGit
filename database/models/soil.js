const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Soil extends Model {
    static associate(models) {
      // Relación muchos a muchos con Cellar
      Soil.belongsToMany(models.Cellar, {
        through: "cellars_soils",
        foreignKey: "soilId",
        otherKey: "cellarId",
        as: "cellars",
      });
    }
  }

  Soil.init(
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
      effect: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Soil",
      tableName: "soils",
      timestamps: true,
      underscored: true,
    }
  );

  return Soil;
};
