require('dotenv').config()
const { Op } = require('../db')
const { User } = require('../models')
const fs = require('fs')
const util = require('util')

const importer = async () => {
  const id = 10133
  const readFile = util.promisify(fs.readFile)
  const file = await readFile(`${process.cwd}/src/data/${id}.html`, 'utf-8')

  const query = {
    dossier: file
  }

  try {
    const out = await User.update(query, {
      where: { id: { [Op.eq]: id } }
    })
    console.log(out)
  } catch (err) {
    console.error(err)
  }
}

;(async () => {
  await importer()
})()
