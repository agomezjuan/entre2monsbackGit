const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Wine, {
        foreignKey: "wine_vintage_id",
        as: "wine",
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
      },
      reorderLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      wine_vintage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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

  return Stock;
};
