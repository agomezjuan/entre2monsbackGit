const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Attribute extends Model {
    static associate(models) {
      Attribute.belongsTo(models.AttributeCategory, {
        foreignKey: "attribute_category_id",
        as: "category",
      });

      Attribute.belongsToMany(models.Wine, {
        through: "wines_attributes",
        foreignKey: "attributeId",
        otherKey: "wineId",
        as: "wines",
      });

      Attribute.belongsToMany(models.WineCharacteristic, {
        through: models.WineCharacteristicsAttributes,
        foreignKey: "attribute_id",
        otherKey: "wine_characteristic_id",
        as: "wineCharacteristics",
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
      attribute_category_id: {
        // Este nombre debe coincidir en el controlador y migración
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "attribute_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
