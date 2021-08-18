'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Team extends Model {
    static associate(models) {
      Team.hasMany(models.User, {
        foreignKey: {
          allowNull: false,
          name: "team_user_id"
        }
      })
    }
  };

  Team.init({
    team_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    }
  }
  ,{
    sequelize,
    underscored: true,
    modelName: 'Team',
    tableName: "Teams"
  });

  return Team;
};