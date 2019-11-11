require('dotenv').config()
const fs = require('fs')
const util = require('util')
const { User } = require('./models')
const { Op } = require('./db')

const importer = async () => {
  const readFile = util.promisify(fs.readFile)
  const dir = process.cwd() + '/data'
  console.log(dir)
  let lookups = []

  const users = await User.findAll()

  fs.readdir(dir, async (err, files) => {
    if (err) console.error(err)

    for (let k in files) {
      try {
        const data = JSON.parse(await readFile(`${dir}/${files[k]}`, 'utf-8'))
        data.email = files[k].replace('.curloutput', '')
        lookups.push(data)
      } catch (_err) {
        console.error(_err)
      }
    }

    for (let k in users) {
      const lookup = lookups.filter(lu => {
        return lu.email === users[k].email
      })

      if (lookup.length) {
        const out = await User.update(
          { lookup: JSON.stringify(lookup[0]) },
          { where: { id: { [Op.eq]: users[k].id } } }
        )
        console.log(out)
      }
    }
  })
}

;(async () => {
  await importer()
})()
