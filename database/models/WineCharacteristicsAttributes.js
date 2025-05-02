// models/WineCharacteristicsAttributes.js
module.exports = (sequelize, DataTypes) => {
  const WineCharacteristicsAttributes = sequelize.define(
    "WineCharacteristicsAttributes",
    {},
    {
      tableName: "wine_characteristics_attributes",
      timestamps: true,
      underscored: true,
    }
  );

  return WineCharacteristicsAttributes;
};
