'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.Permission, {
        foreignKey: {
          allowNull: false,
          name: "role_id"
        },
        through: "role_permission"
      })
      Role.hasMany(models.User, {
        foreignKey: {
          allowNull: false,
          name: "role_id"
        },
      })
    }
  };

  Role.init({
    role_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
    }
    ,{
      sequelize,
      underscored: true,
      modelName: 'Role',
      tableName: 'roles'
  });

  return Role;
};