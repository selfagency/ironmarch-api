require('envkey')
const express = require('express')
const routes = require('./routes')
global.Console = require('consola')
global.debug = process.env.ENVIRONMENT !== 'development'

const app = express()
const port = process.env.PORT || 3031
routes(app)

app.listen(port)
Console.log(`Listening on port ${port}`)
