'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.Role_permission, {
        foreignKey:{
          allowNull:false
        }
      })
    }
  };

  Permission.init({
    permission_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
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
    modelName: 'Permission',
    tableName: 'permissions'
  });
  
  return Permission;
};