const app = require('../../src/app')
const cache = require('../../src/cache')
const post = require('../../src/routes/post')

post('/', app, cache)

app.listen(process.env.PORT || 3031)
