const { db, Model, DataTypes } = require('../db')

class Msg extends Model {}
Msg.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'msg_id',
      unique: true,
      primaryKey: true
    },
    threadId: {
      type: DataTypes.INTEGER,
      field: 'msg_topic_id'
    },
    content: {
      type: DataTypes.TEXT,
      field: 'msg_post'
    },
    authorId: {
      type: DataTypes.INTEGER,
      field: 'msg_author_id'
    },
    date: {
      type: DataTypes.INTEGER,
      field: 'msg_date'
    },
    first: {
      type: DataTypes.BOOLEAN,
      field: 'msg_is_first_post'
    }
  },
  {
    sequelize: db,
    modelName: 'message',
    tableName: 'messages',
    timestamps: false
  }
)

module.exports = Msg
