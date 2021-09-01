'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Box, {
        foreignKey:{
          name: "box_id",
          allowNull: false
        },
      })
      Stock.belongsTo(models.Item,{
        foreignKey:{
          name: "item_id",
          allowNull: false
        },
    })
  };
}

  Stock.init({
    stock_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
  }
    ,{
      sequelize,
      underscored: true,
      modelName: 'Stock',
      tableName: 'stocks'
  });

  return Stock;
};