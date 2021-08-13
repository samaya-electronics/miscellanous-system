'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_permission extends Model {

    static associate(models) {
      Role_permission.hasMany(models.Role)
      Role_permission.hasMany(models.Permission)
    }
  };

  Role_permission.init({
    role_permission_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  },
  {
    sequelize,
    modelName: 'Role_permission',
    tableName: 'role_permissions'
  });

  return Role_permission;
};