const cache = require('./cache')
const msg = require('./routes/msg')
const post = require('./routes/post')
const user = require('./routes/user')

const routes = app => {
  msg('/msg', app, cache)
  post('/post', app, cache)
  user('/user', app, cache)
}

module.exports = routes
