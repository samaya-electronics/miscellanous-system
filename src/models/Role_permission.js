'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    tableName: 'role_permission'
  });

  Role_permission.associate = models=>{
      Role_permission.hasMany(models.Role)
      Role_permission.hasMany(models.Permission)
    }
  return Role_permission;
};