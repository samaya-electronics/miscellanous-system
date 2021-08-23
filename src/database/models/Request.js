'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {

    static associate(models) {
      Request.belongsTo(models.Item, {
        foreignKey:{
          name: "item_id",
          allowNull: false
        },
      })
      Request.belongsTo(models.User, {
        foreignKey:{
          allowNull: false,
          name: "user_requesting_id"
        },
      })
      Request.belongsTo(models.User, {
        foreignKey:{
          allowNull: false,
          name: "user_approving_id"
        },
      })
    }
  };

  Request.init({
    request_id: {
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
        min: 1
      }
    }
  }
  ,{
    sequelize,
    underscored: true,
    modelName: 'Request',
    tableName: 'requests'
  });

  return Request;
};