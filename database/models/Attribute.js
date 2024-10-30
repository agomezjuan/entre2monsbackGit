const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Attribute extends Model {
    static associate(models) {
      // Relación uno a muchos con AttrubuteCategory
      Attribute.belongsTo(models.AttributeCategory, {
        foreignKey: "attributeCategoryId",
        as: "category",
      });

      // Relación muchos a muchos con Wine a través de la tabla intermedia wines_attributes
      Attribute.belongsToMany(models.Wine, {
        through: "wines_attributes",
        foreignKey: "attributeId",
        otherKey: "wineId",
        as: "wines",
      });
    }
  }

  Attribute.init(
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
      AttributeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "attribute_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "Relación con el modelo AttributeCategory",
      },
    },
    {
      sequelize,
      modelName: "Attribute",
      tableName: "attributes",
      timestamps: true,
      underscored: true,
    }
  );

  return Attribute;
};
