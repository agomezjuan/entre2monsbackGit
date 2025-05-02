// models/WineVintageType.js
module.exports = (sequelize, DataTypes) => {
  const WineVintageType = sequelize.define(
    "WineVintageType",
    {},
    {
      tableName: "wine_vintage_types",
      timestamps: true,
      underscored: true,
    }
  );

  return WineVintageType;
};
