global.debug = process.env.ENVIRONMENT !== 'development'
const cors = require('cors')

const app = require('../../src/app.js')
const cache = require('../../src/cache.js')
const msg = require('../../src/routes/msg.js')

msg('/', app, cache, cors, {
  origin: '*'
})

app.listen(process.env.PORT || 3031)
