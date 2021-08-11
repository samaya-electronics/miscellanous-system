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
    tableName:' user'
  });

  user.associate = models=>{
      user.hasMany(models.Request)
      user.hasOne(models.Role)
  }
  return User;
};