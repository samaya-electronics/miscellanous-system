'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Item, {
        foreignKey: {
          allowNull: false,
          name: "category_id"
        }
      })
    }
  };

  Category.init({
    category_id: {
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
    modelName: 'Category',
    tableName: "categories"
  });

  return Category;
};