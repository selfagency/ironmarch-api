const cors = require('cors')

const cache = require('./cache')
const meta = require('./routes/meta')
const msg = require('./routes/msg')
const post = require('./routes/post')
const thread = require('./routes/thread')
const user = require('./routes/user')

const corsOpts = {
  origin: '*'
}

const routes = app => {
  meta('/api/meta', app, cache, cors, corsOpts)
  msg('/api/msg', app, cache, cors, corsOpts)
  post('/api/post', app, cache, cors, corsOpts)
  thread('/api/thread', app, cache, cors, corsOpts)
  user('/api/user', app, cache, cors, corsOpts)
}

module.exports = routes
