const cache = require('express-redis-cache')({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
  auth_pass: process.env.CACHE_PASS,
  prefix: 'iron-march',
  expire: process.env.ENVIRONMENT === 'development' ? 60 : 3600
})

module.exports = cache
