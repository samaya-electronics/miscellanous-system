'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

class Location extends Model {
    static associate(models) {
        Location.belongsTo(models.Area, {
        foreignKey:{
            name: "area_id",
            allowNull: false
        },
        })
        Location.hasMany(models.Box, {
        foreignKey: {
            name: "location_id",
            allowNull: false
        },
        })
    }
    };

  Location.init({
    Location_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    code: {
        type: DataTypes.STRING(300),
        allowNull: false,
    }
  }
  ,{
    sequelize,
    underscored: true,
    modelName: 'Location',
    tableName: "locations"
  });

  return Location;
};