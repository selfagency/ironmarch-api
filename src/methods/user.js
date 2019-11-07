const { Op } = require('../db')
const dbUser = require('../models/user')

const user = async params => {
  try {
    const { id, limit, offset, terms } = params
    let output,
      where = {}

    if (terms) where.name = { [Op.like]: `%${terms}%` }

    output = id
      ? await dbUser.findById(parseInt)
      : await dbUser.findAll({
          where,
          limit: limit ? parseInt(limit) : 50,
          offset: offset ? parseInt(offset) : 0
        })

    // Console.log(output)
    return output
  } catch (err) {
    Console.error(err)
    return err
  }
}

module.exports = user
