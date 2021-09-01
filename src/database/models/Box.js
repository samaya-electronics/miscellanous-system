'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Box extends Model {
    static associate(models) {
      Box.belongsTo(models.Location, {
        foreignKey:{
            name: "location_id",
            allowNull: false
        },
      })
      Box.hasOne(models.Stock, {
        foreignKey: {
          name: "box_id",
          allowNull: false
        },
      })
    }
  };

  Box.init({
    box_id: {
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
    modelName: 'Box',
    tableName: "boxes"
  });

  return Box;
};