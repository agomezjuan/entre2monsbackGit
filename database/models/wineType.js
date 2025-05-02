const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class WineType extends Model {
    static associate(models) {
      // Relación uno a muchos con Wine
      WineType.hasMany(models.Wine, {
        foreignKey: "wine_type_id",
        as: "wines",
      });

      WineType.belongsToMany(models.WineVintage, {
        through: models.WineVintageType,
        foreignKey: "wine_type_id",
        otherKey: "wine_vintage_id",
        as: "wineVintages",
      });
    }
  }

  WineType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Nombre del tipo de vino (e.g., Tinto, Blanco, Rosado)",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descripción del tipo de vino",
      },
    },
    {
      sequelize,
      modelName: "WineType",
      tableName: "wine_types",
      timestamps: false,
      underscored: true,
    }
  );

  return WineType;
};
