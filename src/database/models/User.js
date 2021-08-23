'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Request, {
        foreignKey:{
          name: "user_requesting_id",
          allowNull: false
        },
      })
      User.belongsTo(models.Role, {
        foreignKey: {
          allowNull: false,
          name: "role_id"
        },
      })
      User.belongsTo(models.User, {
        foreignKey: {
          allowNull: true,
          name: "user_manager_id"
        },
      })
      User.hasMany(models.User, {
        foreignKey: {
          allowNull: true,
          name: "user_manager_id"
        },
      })
      User.belongsToMany(models.Item, {
        through: models.ItemAuth
      })
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
    }
    }
    ,{
      sequelize,
      underscored: true,
      modelName: 'User',
      tableName:' users'
  });

  return User;
};