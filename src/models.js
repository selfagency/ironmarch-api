const Msg = require('./models/msg')
const Post = require('./models/post')
const Thread = require('./models/thread')
const User = require('./models/user')

Msg.hasOne(Thread, { as: 'title', sourceKey: 'threadId', foreignKey: 'id' })
Msg.hasOne(User, { as: 'author', sourceKey: 'authorId', foreignKey: 'id' })
Post.hasOne(User, { as: 'author', sourceKey: 'authorId', foreignKey: 'id' })
User.hasMany(Post, { as: 'posts', sourceKey: 'id', foreignKey: 'authorId' })
User.hasMany(Msg, { as: 'messages', sourceKey: 'id', foreignKey: 'authorId' })

module.exports = { Msg, Post, Thread, User }
