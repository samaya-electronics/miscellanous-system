'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Request)
      User.hasOne(models.Role)
    }
  };

  User.init({
    user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(100),
        allowNull:false,
        unique: true,
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
    modelName: 'User',
    tableName:' users'
  });

  return User;
};