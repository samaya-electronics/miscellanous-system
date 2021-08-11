'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Item.init({
    item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      category_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        reference_id: {
          model:'category',
          key: 'category_id'
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
    }
    ,{
    sequelize,
    modelName: 'Item',
    tableName: 'item'
  });

  Item.associate= models =>{
      Item.belongsTo(models.category)
  }

  Item.associate= models =>{
    Item.belongsTo(models.request)
}


  return Item;
};