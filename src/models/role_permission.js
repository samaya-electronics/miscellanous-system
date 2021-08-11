'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role_permission.init({
    role_permission_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      permission_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        reference_id: {
          model:'permission',
          key:'permission_id'
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
    });

    await queryInterface.createTable('permission', {
      permission_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
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
    modelName: 'role_permission',
  });

  role_permission.associate = models=>{
      role_permission.hasMany(models.role,{
          onDelete: "cascade"
      })
      role_pemission.hasMany(models.permission)
    }
  return role_pemission;
};