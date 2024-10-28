const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class IconSubcategory extends Model {
    static associate(models) {
      IconSubcategory.belongsTo(models.IconCategory, {
        foreignKey: "categoryId",
        as: "category",
      });
      IconSubcategory.hasMany(models.Icon, {
        foreignKey: "subcategoryId",
        as: "icons",
      });
    }
  }

  IconSubcategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Nombre de la subcategoría de íconos",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "icon_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "IconSubcategory",
      tableName: "icon_subcategories",
      timestamps: false,
      underscored: true,
    }
  );

  return IconSubcategory;
};
