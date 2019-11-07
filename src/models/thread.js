const { db, Model, DataTypes } = require('../db')

class Thread extends Model {}

Thread.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'mt_id',
      unique: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      field: 'mt_title'
    }
  },
  { sequelize: db, modelName: 'thread', tableName: 'threads', timestamps: false }
)

module.exports = Thread
