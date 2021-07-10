const { Sequelize, Model, DataTypes, Op } = require('sequelize')

const storage = `${process.cwd()}/common/ironmarch.db`

global.db = new Sequelize('ironmarch', null, null, {
  dialect: 'sqlite',
  storage
})

module.exports = { db, Model, DataTypes, Op }
