'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Area extends Model {
    static associate(models) {
      Area.hasMany(models.Section, {
        foreignKey: {
          allowNull: false,
          name: "area_id"
        }
      })
    }
  };

  Area.init({
    area_id: {
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
    modelName: 'Area',
    tableName: "areas"
  });

  return Area;
};