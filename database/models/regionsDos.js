const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RegionsDOs extends Model {}

  RegionsDOs.init(
    {
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      do_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RegionsDOs",
      tableName: "regions_dos",
      timestamps: false,
      underscored: true,
    }
  );

  return RegionsDOs;
};
