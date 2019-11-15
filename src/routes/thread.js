const { Thread } = require('../methods')

const thread = (path, app, cache, cors, corsOpts) => {
  app.use(path, cors(corsOpts), cache.route(), async (req, res, next) => {
    let out
    try {
      out = await Thread(req.query)
      if (!out || !Object.entries(out).length) {
        out =
          req.baseUrl === '/api/thread'
            ? new Error('Item not found')
            : new Error('No results found')
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

module.exports = thread
