const { Post } = require('../methods')

const post = (path, app, cache, cors, corsOpts) => {
  app.use(path, cors(corsOpts), cache.route(), async (req, res, next) => {
    let out
    try {
      out = await Post(req.query)
      if (!out) {
        out = req.baseUrl === '/api/post' ? 'Item not found' : 'No results found.'
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

module.exports = post
