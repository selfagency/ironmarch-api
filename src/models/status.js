const { db, Model, DataTypes } = require('../db')

class Status extends Model {}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'index_id',
      unique: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      field: 'index_content'
    },
    authorId: {
      type: DataTypes.INTEGER,
      field: 'index_author'
    },
    date: {
      type: DataTypes.INTEGER,
      field: 'index_date_created'
    }
  },
  { sequelize: db, modelName: 'status', tableName: 'statuses', timestamps: false }
)

module.exports = Status
