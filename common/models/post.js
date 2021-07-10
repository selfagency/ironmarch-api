const { db, Model, DataTypes } = require('../db')

class Post extends Model {}

Post.init(
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
    },
    related: {
      type: DataTypes.INTEGER,
      field: 'index_item_id'
    }
  },
  { sequelize: db, modelName: 'post', tableName: 'posts', timestamps: false }
)

module.exports = Post
