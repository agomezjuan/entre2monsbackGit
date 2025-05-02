// model
module.exports = (sequelize, DataTypes) => {
  const AttributeType = sequelize.define(
    "AttributeType",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      modelName: "AttributeType",
      tableName: "attribute_types",
      timestamps: true,
      underscored: true,
    }
  );

  AttributeType.associate = (models) => {
    // AttributeType.hasMany(models.AttributeFamily, {
    //   foreignKey: "attribute_type_id",
    //   as: "families",
    // });
  };

  return AttributeType;
};
