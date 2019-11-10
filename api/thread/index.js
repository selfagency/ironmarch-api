global.debug = process.env.ENVIRONMENT !== 'development'
const cors = require('cors')

const app = require('../../src/app.js')
const cache = require('../../src/cache.js')
const thread = require('../../src/routes/thread.js')

thread('/', app, cache, cors, {
  origin: '*'
})

app.listen(process.env.PORT || 3031)
