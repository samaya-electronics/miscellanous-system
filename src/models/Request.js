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
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      request_date:{
        type: Sequelize.DATE,
        allowNull:false,
      },
      approval_date:{
        type: Sequelize.DATE,
        allowNull:false,
      },
      aproved:{
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
    }
    ,{
    sequelize,
    modelName: 'Request',
    tableName: 'request'
  });

  Request.associate = models=>{
      Request.hasOne(models.Item)
      Request.belongsTo(models.User)
      Request.belongsTo(models.User)
  }
  return Request;
};