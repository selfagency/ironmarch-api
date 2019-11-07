const { db, Model, DataTypes } = require('../db')
const User = require('./user')

class Post extends Model {}
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'index_id',
      unique: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      field: 'index_class'
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
  { sequelize: db, modelName: 'posts', timestamps: false }
)

Post.hasOne(User, { as: 'author', foreignKey: 'id', targetKey: 'authorId' })

module.exports = Post
