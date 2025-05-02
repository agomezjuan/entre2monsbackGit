// models/WineVintage.js
module.exports = (sequelize, DataTypes) => {
  const WineVintage = sequelize.define(
    "WineVintage",
    {
      wine_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wines",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      vintage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "vintages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "wine_vintages",
      timestamps: true,
      underscored: true,
    }
  );

  WineVintage.associate = (models) => {
    WineVintage.belongsTo(models.Wine, {
      foreignKey: "wine_id",
      as: "wine",
    });

    WineVintage.belongsTo(models.Vintage, {
      foreignKey: "vintage_id",
      as: "vintage",
    });

    // Aquí conectamos el triángulo
    WineVintage.belongsToMany(models.WineType, {
      through: models.WineVintageType,
      foreignKey: "wine_vintage_id",
      otherKey: "wine_type_id",
      as: "wineTypes",
    });
  };

  return WineVintage;
};
