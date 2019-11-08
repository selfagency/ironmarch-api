const { User } = require('../methods')

const user = (path, app, cache, cors, corsOpts) => {
  app.use(path, cors(corsOpts), cache.route(), async (req, res, next) => {
    let out
    try {
      out = await User(req.query)
      if (!out) {
        out = req.baseUrl === '/api/user' ? 'Item not found' : 'No results found.'
        res.status(404)
      }
    } catch (err) {
      out = debug ? err.stack : err.message
      res.status(500)
    } finally {
      res.send(out)
    }
  })
}

module.exports = user
