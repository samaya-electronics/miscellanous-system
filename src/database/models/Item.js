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
      Item.belongsToMany(models.User, {
        through: models.ItemAuth
      })

      Item.hasMany(models.Stock,{
        foreignKey: {
          name: "item_id",
          allowNull: false
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
    // quantity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     isInt: true,
    //     min: 0
    //   }
    // },
    code: {
      type: DataTypes.STRING(500),
      allowNull: false,
      // validate: {
      //   isAlphanumeric: true,
      // }
    },
    // location: {
    //   type: DataTypes.STRING(500),
    //   allowNull: false,
    // },
    threshold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
    leader_approve:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
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