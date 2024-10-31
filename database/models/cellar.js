const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cellar extends Model {
    static associate(models) {
      // Relación uno a muchos con DO
      Cellar.belongsTo(models.DO, {
        foreignKey: "doId",
        as: "denomination",
      });

      // Relación muchos a muchos con Soils
      Cellar.belongsToMany(models.Soil, {
        through: "cellars_soils",
        foreignKey: "cellar_id",
        otherKey: "soil_id",
        as: "soils",
      });

      // Relación muchos a muchos con Suppliers
      Cellar.belongsToMany(models.Supplier, {
        through: "cellars_suppliers",
        foreignKey: "cellar_id",
        otherKey: "supplier_id",
        as: "suppliers",
      });
    }
  }

  Cellar.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      distance: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      awards: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      history: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      doId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Cellar",
      tableName: "cellars",
      timestamps: true,
      underscored: true,
    }
  );

  return Cellar;
};
