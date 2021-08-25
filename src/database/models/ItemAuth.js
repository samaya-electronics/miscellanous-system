'use strict';
const User = require('./User')
const Item = require('./Item')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class ItemAuth extends Model {};

	ItemAuth.init({
	  item_auth_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
		order: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
  },{
		sequelize,
		underscored: true,
		modelName: 'ItemAuth',
		tableName: 'item_auth'
	});

  return ItemAuth;
};