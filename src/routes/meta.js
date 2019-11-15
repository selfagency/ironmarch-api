const {
  Discord,
  Facebook,
  Linkedin,
  Locales,
  Skype,
  Twitter
} = require('../methods')

const meta = (path, app, cache, cors, corsOpts) => {
  app.use(path, cors(corsOpts), cache.route(), async (req, res, next) => {
    let out
    try {
      switch (req.query.data) {
        case 'discord':
          out = await Discord(req.query)
          break
        case 'facebook':
          out = await Facebook(req.query)
          break
        case 'linkedin':
          out = await Linkedin(req.query)
          break
        case 'skype':
          out = await Skype(req.query)
          break
        case 'twitter':
          out = await Twitter(req.query)
          break
        case 'locales':
          out = await Locales()
          break
        case 'all':
          const [
            discord,
            facebook,
            linkedin,
            skype,
            twitter,
            locales
          ] = await Promise.all([
            Discord(req.query),
            Facebook(req.query),
            Linkedin(req.query),
            Skype(req.query),
            Twitter(req.query),
            Locales()
          ])
          out = {
            discord,
            facebook,
            linkedin,
            skype,
            twitter,
            locales
          }
          break
      }

      if (!out || !Object.entries(out).length) {
        out =
          req.baseUrl === '/api/meta'
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

module.exports = meta
