const { Sequelize } = require('sequelize');
const env = require('dotenv').config();

// inits
const sqliz = new Sequelize('test_db', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
}
);

module.exports = sqliz;