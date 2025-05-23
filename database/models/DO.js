const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DO extends Model {
    static associate(models) {
      DO.belongsToMany(models.Region, {
        through: "regions_dos",
        foreignKey: "do_id",
        otherKey: "region_id",
        as: "regions",
      });

      DO.hasMany(models.Cellar, {
        foreignKey: "doId",
        as: "cellars",
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "DO",
      tableName: "dos",
      timestamps: true,
      underscored: true,
    }
  );

  return DO;
};
