global.debug = process.env.ENVIRONMENT !== 'development'

const app = require('../../src/app')
const cache = require('../../src/cache')
const user = require('../../src/routes/user')

user('/', app, cache)

app.listen(process.env.PORT || 3031)
