const { Model, DataTypes } = require("sequelize");
const { afterCellarUpdate } = require("../hooks/cellarHooks");

module.exports = (sequelize) => {
  class Cellar extends Model {
    static associate(models) {
      Cellar.belongsTo(models.DO, {
        foreignKey: "doId",
        as: "denomination",
      });

      Cellar.belongsToMany(models.Soil, {
        through: "cellars_soils",
        foreignKey: "cellar_id",
        otherKey: "soil_id",
        as: "soils",
      });

      Cellar.belongsToMany(models.Supplier, {
        through: "cellars_suppliers",
        foreignKey: "cellar_id",
        otherKey: "supplier_id",
        as: "suppliers",
      });

      Cellar.hasMany(models.Stock, {
        foreignKey: "cellarId",
        as: "stocks",
      });

      Cellar.hasMany(models.Waste, {
        foreignKey: "cellarId",
        as: "wastes",
      });

      Cellar.hasMany(models.Wine, {
        foreignKey: "cellarId",
        as: "wines",
      });
    }
  }

  Cellar.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

  Cellar.addHook("afterUpdate", afterCellarUpdate);

  return Cellar;
};
