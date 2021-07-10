const Thread = require('../../common/methods/thread')

module.exports = async (req, res) => {
  let out
  try {
    out = await Thread(req.query)
    if (!out || !Object.entries(out).length) {
      out = req.baseUrl === '/api/thread' ? new Error('Item not found') : new Error('No results found')
      res.status(404)
    }
  } catch (err) {
    out = process.env.debug ? err.stack : err.message
    res.status(500)
  } finally {
    res.send(out)
  }
}
