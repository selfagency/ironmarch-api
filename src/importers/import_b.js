require('dotenv').config()
const fs = require('fs')
const util = require('util')
const { User } = require('./src/models')
const { Op } = require('./src/db')

const importer = async () => {
  const readFile = util.promisify(fs.readFile)
  let lookups = []

  const users = await User.findAll()

  try {
    lookups = JSON.parse(await readFile('data/members2.json', 'utf-8'))
  } catch (_err) {
    console.error(_err)
  }

  for (let k in users) {
    let query

    const lookup = lookups.filter(lu => {
      return parseInt(lu.pp_member_id) === users[k].id
    })[0]

    if (lookup) {
      query = {
        signature: lookup.signature
      }

      console.log(`query: ${JSON.stringify(query)}`)

      try {
        const out = await User.update(query, { where: { id: { [Op.eq]: users[k].id } } })
        console.log(`out: ${out}\n\n`)
      } catch (err) {
        console.error(err)
      }
    }
  }
}

;(async () => {
  await importer()
})()
