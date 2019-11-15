const { Sequelize, Model, DataTypes, Op } = require('sequelize')

global.db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
)

module.exports = { db, Model, DataTypes, Op }
