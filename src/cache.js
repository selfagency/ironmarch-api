const cache = require('express-redis-cache')({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
  auth_pass: process.env.CACHE_PASS,
  prefix: 'iron-march',
  expire: { '4xx': 1, '5xx': 1, xxx: process.env.ENVIRONMENT === 'development' ? 60 : 86400 }
})

module.exports = cache
