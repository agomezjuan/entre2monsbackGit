const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DO extends Model {
    static associate(models) {
      DO.belongsToMany(models.Region, {
        through: "RegionDO",
        foreignKey: "doId",
        otherKey: "regionId",
        as: "regions",
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
