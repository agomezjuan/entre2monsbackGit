const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Stock extends Model {
    static associate(models) {
      // Relaciones con DO y Cellar
      Stock.belongsTo(models.DO, {
        foreignKey: "do_id",
        as: "denomination",
      });
      Stock.belongsTo(models.Cellar, {
        foreignKey: "cellar_id",
        as: "cellar",
      });
    }
  }

  Stock.init(
    {
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment: "Cantidad disponible en inventario",
      },
      reorderLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment: "Nivel mínimo de inventario para reordenar",
      },
      do_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cellar_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cellars",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      wine_vintage_id: {
        // Relación directa con una entrada de wine_vintages
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintages", // La tabla intermedia que combina Wine y Vintage
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "Relación directa con wine_vintages",
      },
    },
    {
      sequelize,
      modelName: "Stock",
      tableName: "stocks",
      timestamps: true,
      underscored: true,
    }
  );

  // Hook para generar SKU basado en DO, Cellar, WineVintage y el nombre del vino
  Stock.beforeCreate(async (stock, options) => {
    const doId = stock.do_id;
    const cellarId = stock.cellar_id;
    const wineVintageId = stock.wine_vintage_id;

    // Obtener el nombre del vino desde `Wine` a través de `WineVintage`
    const wineVintage = await sequelize.models.WineVintage.findByPk(
      wineVintageId,
      {
        include: {
          model: sequelize.models.Wine,
          as: "wine",
        },
      }
    );
    const wineName =
      wineVintage && wineVintage.wine ? wineVintage.wine.name : "NONAME";
    const wineAbbreviation = wineName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 3)
      .join(""); // Usa las tres primeras letras del nombre o una abreviatura de hasta 3 letras

    // Formato del SKU: DOID-CELLARID-WINEVINTAGEID-ABREVIATURA
    stock.sku = `${doId}-${cellarId}-${wineVintageId}-${wineAbbreviation}`;
  });

  return Stock;
};
