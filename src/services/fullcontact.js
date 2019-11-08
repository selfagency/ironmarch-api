const got = require('got')
const queryString = require('query-string')

const fullcontact = async params => {
  try {
    const url = 'https://api.fullcontact.com/v2/person.json'
    const payload = (await got(`${url}?${queryString.stringify(params)}`, {
      json: true,
      headers: {
        'X-FullContact-APIKey': process.env.FULLCONTACT
      }
    })).body
    return payload
  } catch (err) {
    console.error(err)
    return {}
  }
}

module.exports = fullcontact
