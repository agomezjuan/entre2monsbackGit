const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Stock extends Model {
    static associate(models) {
      // Relaciones con DO, Cellar y WineVintage (tabla intermedia)
      Stock.belongsTo(models.DO, {
        foreignKey: "doId",
        as: "denomination",
      });
      Stock.belongsTo(models.Cellar, {
        foreignKey: "cellarId",
        as: "cellar",
      });
      Stock.belongsTo(models.WineVintage, {
        foreignKey: "wineVintageId",
        as: "wineVintage",
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
      doId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "denominations_of_origin",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      modelName: "Stock",
      tableName: "stocks",
      timestamps: true,
      underscored: true,
    }
  );

  // Hook para generar SKU basado en DO, Cellar, WineVintage y el nombre del vino
  Stock.beforeCreate(async (stock, options) => {
    const doId = stock.doId;
    const cellarId = stock.cellarId;
    const wineVintageId = stock.wineVintageId;

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
