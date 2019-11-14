require('dotenv').config()
const fs = require('fs')
const util = require('util')
const { User } = require('../models')
const { Op } = require('../db')

const importer = async () => {
  const readFile = util.promisify(fs.readFile)
  let profiles

  const users = await User.findAll()

  try {
    profiles = JSON.parse(await readFile(`${process.cwd()}/src/data/profiles.json`, 'utf-8'))
  } catch (_err) {
    console.error(_err)
  }

  for (let k in users) {
    let query

    const profile = profiles.filter(p => {
      return parseInt(p.member_id) === users[k].id
    })[0]

    if (profile) {
      query = {
        interests: profile.field_7,
        ideology: profile.field_11,
        location: profile.field_6,
        gender: profile.field_5,
        url: profile.field_3,
        socialAim: profile.field_1,
        socialMsn: profile.field_2,
        socialIcq: profile.field_4,
        socialYahoo: profile.field_8,
        socialJabber: profile.field_9,
        socialSkype: profile.field_10,
        socialTwitter: profile.field_13,
        ideologyAlt: profile.field_12
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
