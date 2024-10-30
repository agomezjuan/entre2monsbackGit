const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AttributeCategory extends Model {
    static associate(models) {
      // Relación uno a muchos con Attribute
      AttributeCategory.hasMany(models.Attribute, {
        foreignKey: "attributeCategoryId",
        as: "attributes",
      });
    }
  }

  AttributeCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AttributeCategory",
      tableName: "attribute_categories",
      timestamps: true,
      underscored: true,
    }
  );

  return AttributeCategory;
};
