require('dotenv').config()
const { User } = require('../models')
const { Op } = require('../db')
const got = require('got')

const importer = async () => {
  let users, lookup

  users = await User.findAll()

  for (let k in users) {
    const query = `http://api.ipstack.com/${users[k].ipAlt}?access_key=${process.env.IPSTACK}`
    console.log(`${query}:\n`)

    try {
      lookup = (
        await got(query, {
          json: true
        })
      ).body

      console.log(lookup)

      if (lookup) {
        try {
          const out = await User.update({ geoAlt: JSON.stringify(lookup) }, { where: { id: { [Op.eq]: users[k].id } } })
          console.log(`out: ${out}\n\n`)
        } catch (err) {
          console.error(err)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
}

;(async () => {
  await importer()
})()
