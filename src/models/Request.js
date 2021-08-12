'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    tableName: 'request'
  });

  Request.associate = models => {
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
  return Request;
};