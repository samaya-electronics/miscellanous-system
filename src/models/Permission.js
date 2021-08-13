'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        foreignKey: {
          allowNull: false,
          name: "permission_id"
        },
        constraints: false,
        through: "role_permission"
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
    }
  }
  ,{
    sequelize,
    underscored: true,
    modelName: 'Permission',
    tableName: 'permissions'
  });
  
  return Permission;
};