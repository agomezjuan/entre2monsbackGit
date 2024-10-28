const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class WineVintageGrape extends Model {
    static associate(models) {
      // Relación con Grape
      WineVintageGrape.belongsTo(models.Grape, {
        foreignKey: "grapeId",
        as: "grape",
      });
      // Relación con WineVintage
      WineVintageGrape.belongsTo(models.WineVintage, {
        foreignKey: "wineVintageId",
        as: "wineVintage",
      });
    }
  }

  WineVintageGrape.init(
    {
      grapeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "grapes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      wineVintageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "WineVintageGrape",
      tableName: "wine_vintage_grapes",
      timestamps: false,
      underscored: true,
    }
  );

  return WineVintageGrape;
};
