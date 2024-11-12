const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Icon extends Model {
    static associate(models) {
      Icon.belongsTo(models.IconSubcategory, {
        foreignKey: "subcategoryId",
        as: "subcategory",
      });

      Icon.belongsToMany(models.Wine, {
        through: "wines_vintages_icons",
        foreignKey: "icon_id",
        otherKey: "wine_vintage_id",
        as: "wineVintages",
      });
    }
  }

  Icon.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Nombre descriptivo del ícono",
      },
      icon_path: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Ruta o URL del archivo del ícono",
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "icon_subcategories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Icon",
      tableName: "icons",
      timestamps: false,
      underscored: true,
    }
  );

  return Icon;
};
