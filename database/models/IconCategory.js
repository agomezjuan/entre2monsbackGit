const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class IconCategory extends Model {
    static associate(models) {
      IconCategory.hasMany(models.IconSubcategory, {
        foreignKey: "categoryId",
        as: "subcategories",
      });
    }
  }

  IconCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Nombre de la categoría de íconos",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descripción de la categoría",
      },
    },
    {
      sequelize,
      modelName: "IconCategory",
      tableName: "icon_categories",
      timestamps: false,
      underscored: true,
    }
  );

  return IconCategory;
};
