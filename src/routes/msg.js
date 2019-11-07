const { Msg } = require('../methods')

const msg = (path, app, cache) => {
  app.use(path, cache.route(), async (req, res, next) => {
    let out
    try {
      out = await Msg(req.query)
      if (!out) {
        out = 'No results found.'
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

module.exports = msg
