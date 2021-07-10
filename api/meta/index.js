const Discord = require('../../common/methods/discord')
const Facebook = require('../../common/methods/facebook')
const Linkedin = require('../../common/methods/linkedin')
const Locales = require('../../common/methods/locales')
const Skype = require('../../common/methods/skype')
const Twitter = require('../../common/methods/twitter')

module.exports = async (req, res) => {
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
        const [discord, facebook, linkedin, skype, twitter, locales] = await Promise.all([
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
      out = req.baseUrl === '/api/meta' ? new Error('Item not found') : new Error('No results found')
      res.status(404)
    }
  } catch (err) {
    out = process.env.debug ? err.stack : err.message
    res.status(500)
  } finally {
    res.send(out)
  }
}
