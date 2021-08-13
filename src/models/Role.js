'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      Role.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      Role.belongsTo(models.Role_permission, {
        foreignKey: {
          allowNull: false
        }
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
    modelName: 'Role',
    tableName: 'roles'
  });

  return Role;
};