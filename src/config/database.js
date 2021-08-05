const { Sequelize } = require('sequelize');
const env = require('dotenv').config();

// inits
const sqliz = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
}
);

module.exports = sqliz;