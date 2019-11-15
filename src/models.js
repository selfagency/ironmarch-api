const Msg = require('./models/msg')
const Post = require('./models/post')
const Status = require('./models/status')
const Thread = require('./models/thread')
const User = require('./models/user')

Msg.hasOne(Thread, { as: 'thread', sourceKey: 'threadId', foreignKey: 'id' })
Msg.hasOne(User, { as: 'author', sourceKey: 'authorId', foreignKey: 'id' })
Post.hasOne(User, { as: 'author', sourceKey: 'authorId', foreignKey: 'id' })
Thread.hasOne(User, {
  as: 'recipient',
  sourceKey: 'recipientId',
  foreignKey: 'id'
})
Thread.hasMany(Msg, { as: 'messages', sourceKey: 'id', foreignKey: 'threadId' })
User.hasMany(Post, { as: 'posts', sourceKey: 'id', foreignKey: 'authorId' })
User.hasMany(Msg, { as: 'messages', sourceKey: 'id', foreignKey: 'authorId' })
User.hasMany(Status, {
  as: 'statuses',
  sourceKey: 'id',
  foreignKey: 'authorId'
})

module.exports = { Msg, Post, Thread, User }
