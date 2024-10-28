const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Wine extends Model {
    static associate(models) {
      // Relación uno a muchos con Cellar
      Wine.belongsTo(models.Cellar, {
        foreignKey: "cellarId",
        as: "cellar",
      });

      // Relación muchos a muchos con WineTypes
      Wine.belongsTo(models.WineType, {
        foreignKey: "wine_type_id",
        as: "wineType",
      });

      // Relación muchos a muchos con Icons
      Wine.belongsToMany(models.Icon, {
        through: "wine_icons",
        foreignKey: "wineId",
        otherKey: "iconId",
        as: "icons",
      });

      // Relación muchos a muchos con Vintages
      Wine.belongsToMany(models.Vintage, {
        through: "wine_vintages",
        foreignKey: "wineId",
        otherKey: "vintageId",
        as: "vintages",
      });

      // Relación muchos a muchos con Attributes
      Wine.belongsToMany(models.Attribute, {
        through: "wine_attributes",
        foreignKey: "wineId",
        otherKey: "attributeId",
        as: "attributes",
      });

      // Relación muchos a muchos con Grapes a través de WineVintageGrape
      Wine.belongsToMany(models.Grape, {
        through: {
          model: models.WineVintageGrape,
          unique: false,
        },
        foreignKey: "wineId",
        otherKey: "grapeId",
        as: "grapes",
      });
    }
  }

  Wine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Nombre del vino",
      },
      vineyardAltitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Altitud del viñedo en metros",
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "URL o ruta de la imagen del vino",
      },
      production: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Producción total en unidades",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descripción adicional del vino",
      },
      cellarId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      wineTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wine_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Wine",
      tableName: "wines",
      timestamps: true,
      underscored: true,
    }
  );

  return Wine;
};
