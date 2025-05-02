const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AttributeCategory extends Model {
    static associate(models) {
      // Relación uno a muchos con Attribute
      AttributeCategory.hasMany(models.Attribute, {
        foreignKey: "attributeCategoryId",
        as: "attributes",
      });

      AttributeCategory.belongsTo(models.AttributeType, {
        foreignKey: "attribute_type_id",
        as: "type",
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

      attribute_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "attribute_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
