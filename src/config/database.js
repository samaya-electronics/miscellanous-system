const { Sequelize } = require('sequelize');
const env = require('dotenv').config();

// inits
const app = express()

const sqliz = new Sequelize('test_db', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
}
);

try {
    await sqliz.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
