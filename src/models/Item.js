'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, {
        foreignKey:{
          allowNull:false
        }
      })
      Item.belongsTo(models.Request, {
        foreignKey:{
          allowNull:false
        }
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }
    ,{
    sequelize,
    modelName: 'Item',
    tableName: 'items'
  });

  return Item;
};