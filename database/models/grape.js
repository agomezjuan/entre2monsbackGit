const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Grape extends Model {
    static associate(models) {
      // Relación muchos a muchos con Wine a través de "wine_vintage_grapes"
      Grape.belongsToMany(models.Wine, {
        through: "wine_vintage_grapes", // Tabla intermedia que conecta Vino + Añada con Uvas
        foreignKey: "grape_id",
        otherKey: "wine_id",
        as: "wines",
      });
    }
  }

  Grape.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Nombre de la uva",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descripción de la uva, características o notas de sabor",
      },
    },
    {
      sequelize,
      modelName: "Grape",
      tableName: "grapes",
      timestamps: true,
      underscored: true,
    }
  );

  return Grape;
};
