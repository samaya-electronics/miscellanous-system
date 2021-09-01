'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

class Section extends Model {
    static associate(models) {
        Section.belongsTo(models.Area, {
        foreignKey:{
            name: "area_id",
            allowNull: false
        },
        })
        Section.hasMany(models.Box, {
        foreignKey: {
            name: "section_id",
            allowNull: false
        },
        })
    }
    };

  Section.init({
    section_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    code: {
        type: DataTypes.STRING(300),
        allowNull: false,
    }
  }
  ,{
    sequelize,
    underscored: true,
    modelName: 'Section',
    tableName: "sections"
  });

  return Section;
};