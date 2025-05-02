const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class WineCharacteristic extends Model {
    static associate(models) {
      WineCharacteristic.belongsTo(models.WineVintage, {
        foreignKey: "wine_vintage_id",
        as: "wineVintage",
      });

      WineCharacteristic.belongsToMany(models.Attribute, {
        through: models.WineCharacteristicsAttributes,
        foreignKey: "wine_characteristic_id",
        otherKey: "attribute_id",
        as: "attributes",
      });
    }
  }

  WineCharacteristic.init(
    {
      wine_vintage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wine_vintages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      body: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      acidity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sweetness: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "WineCharacteristic",
      tableName: "wine_characteristics",
      underscored: true,
    }
  );

  return WineCharacteristic;
};
