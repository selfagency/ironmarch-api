global.debug = process.env.ENVIRONMENT !== 'development'
const cors = require('cors')

const app = require('../../src/app')
const cache = require('../../src/cache')
const user = require('../../src/routes/user')

user('/', app, cache, cors, {
  origin: '*'
})

app.listen(process.env.PORT || 3031)
