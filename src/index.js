require('dotenv').config()
require('module-alias/register')
global.debug = process.env.ENVIRONMENT !== 'development'

const app = require('./app')
const routes = require('./routes')
const port = process.env.PORT || 3031

routes(app)

app.listen(port)
console.log(`Listening on port ${port}`)
