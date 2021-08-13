'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {

    static associate(models) {
      Request.hasOne(models.Item)
      Request.belongsTo(models.User, {
        foreignKey:{
          allowNull:false
        }
      })
      Request.belongsTo(models.User, {
        foreignKey:{
          allowNull:false
        }
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
      },
      request_date:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      approval_date:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      aproved:{
        type: DataTypes.BOOLEAN,
        allowNull:false
      },
    }
    ,{
    sequelize,
    modelName: 'Request',
    tableName: 'requests'
  });

  return Request;
};