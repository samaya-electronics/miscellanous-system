'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, {
        foreignKey:{
          name: "category_id",
          allowNull: false
        },
      })
      Item.hasMany(models.Request, {
        foreignKey: {
          name: "item_id",
          allowNull: false
        },
      })
    }
  };

  Item.init({
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    threshold: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    }
    ,{
      sequelize,
      underscored: true,
      modelName: 'Item',
      tableName: 'items'
  });

  return Item;
};