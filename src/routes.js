const msg = require('./methods/msg')
const post = require('./methods/post')
const user = require('./methods/user')

const routes = app => {
  app.use('/user', async (req, res, next) => {
    const out = await user(req.query)
    res.status(out instanceof Error ? 500 : 200).send(out)
  })

  app.use('/post', async (req, res, next) => {
    const out = await post(req.query)
    res.status(out instanceof Error ? 500 : 200).send(out)
  })

  app.use('/msg', async (req, res, next) => {
    const out = await msg(req.query)
    res.status(out instanceof Error ? 500 : 200).send(out)
  })
}

module.exports = routes
