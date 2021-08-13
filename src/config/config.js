require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}