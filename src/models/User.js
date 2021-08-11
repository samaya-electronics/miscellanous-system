'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING(100),
        allowNull:false,
        unique: true,
      },
      role_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        reference_id: {
          model:'role',
          key: 'role_id'
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
    modelName: 'User',
    tableName:' user'
  });

  user.associate = models=>{
      user.hasMany(models.request,{
          onDelete: "cascade"
      })
      
      user.hasOne(models.role,{
          onDelete:"cascade"
      })

  }
  return User;

};