const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DO extends Model {
    static associate(models) {
      DO.belongsToMany(models.Region, {
        through: "RegionDO", // Asegúrate de que esta tabla intermedia existe en la base de datos
        foreignKey: "do_id",
        otherKey: "region_id",
        as: "regions",
      });
      DO.hasMany(models.Stock, {
        foreignKey: "do_id",
        as: "stocks",
      });
    }
  }

  DO.init(
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
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "DO",
      tableName: "denominations_of_origin",
      timestamps: true,
      underscored: true,
    }
  );

  return DO;
};
