'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {
      // Define association here
      
      Region.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country' });
    }
  };
  Region.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'countryId', 
      references: {
        model: 'countries',
        key: 'id', 
      }
},
    description: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Region',
    tableName: 'regions',
  });
  return Region;
};
