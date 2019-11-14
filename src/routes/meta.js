const { Facebook, Linkedin, Locales, Twitter } = require('../methods')

const meta = (path, app, cache, cors, corsOpts) => {
  app.use(path, cors(corsOpts), cache.route(), async (req, res, next) => {
    let out
    try {
      switch (req.query.data) {
        case 'facebook':
          out = await Facebook(req.query)
          break
        case 'twitter':
          out = await Twitter(req.query)
          break
        case 'linkedin':
          out = await Linkedin(req.query)
          break
        case 'locales':
          out = await Locales()
          break
        case 'all':
          const [facebook, twitter, linkedin, locales] = await Promise.all([
            Facebook(req.query),
            Twitter(req.query),
            Linkedin(req.query),
            Locales()
          ])
          out = {
            facebook,
            twitter,
            linkedin,
            locales
          }
          break
      }

      if (!out || !Object.entries(out).length) {
        out = req.baseUrl === '/api/meta' ? new Error('Item not found') : new Error('No results found')
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

module.exports = meta
