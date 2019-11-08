const got = require('got')

const ipstack = async params => {
  try {
    const endpoint = 'http://api.ipstack.com/'
    const payload = (await got(`${endpoint}${params.ip}?access_key=${process.env.IPSTACK}`, {
      json: true
    })).body
    return payload
  } catch (err) {
    console.error(err)
    return {}
  }
}

module.exports = ipstack
