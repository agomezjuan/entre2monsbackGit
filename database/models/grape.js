const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Grape extends Model {
    static associate(models) {
      // Relación muchos a muchos con WineVintage
      Grape.belongsToMany(models.WineVintage, {
        through: "WineVintageGrape",
        foreignKey: "grapeId",
        otherKey: "wineVintageId",
        as: "wineVintages",
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
