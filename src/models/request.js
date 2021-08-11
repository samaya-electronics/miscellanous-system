'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  request.init({
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
        type: Sequelize.DATE(6),
        allowNull:false,
      },
      approval_date:{
        type: Sequelize.DATE(6),
        allowNull:false,
      },
      aproved:{
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      item_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        reference_id: {
          model:'item',
          key:'item_id'
        }
      },
      user_requisting_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        reference_id: {
          model:'user',
          key: 'user_id'
        }
      },
      user_approving_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        reference_id: {
          model:'user',
          key: 'user_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    
    }
    ,{
    sequelize,
    modelName: 'request',
  });

  request.associate = models=>{
      request.hasMany(models.Item,{
          onDelete: "cascade"
      })

      request.belongsTo(models.user)
  }
  return request;
};