const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Wine extends Model {
    static associate(models) {
      // Relación uno a muchos con Cellar
      Wine.belongsTo(models.Cellar, {
        foreignKey: "cellarId",
        as: "cellar",
      });

      // Relación uno a muchos con WineType
      Wine.belongsTo(models.WineType, {
        foreignKey: "wine_type_id",
        as: "wineType",
      });

      // Relación muchos a muchos con Vintage a través de "wine_vintages"
      Wine.belongsToMany(models.Vintage, {
        through: "wine_vintages", // Nombre de la tabla intermedia
        foreignKey: "wine_id",
        otherKey: "vintage_id",
        as: "vintages",
      });

      // Relación muchos a muchos con Grape a través de "wine_vintage_grapes"
      Wine.belongsToMany(models.Grape, {
        through: "wine_vintage_grapes", // Tabla intermedia que conecta Vino + Añada con Uvas
        foreignKey: "wine_id",
        otherKey: "grape_id",
        as: "grapes",
      });
      Wine.hasMany(models.Stock, {
        foreignKey: "wine_vintage_id",
        as: "stocks",
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
      tastingNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Notas de cata del vino",
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
