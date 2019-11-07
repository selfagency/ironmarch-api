const { Op } = require('../db')
const Msg = require('../models/msg')

const msg = params => {
  try {
    const { id, user, limit, offset, terms } = params,
      include = ['title', 'author']
    let output,
      where = {}

    if (user) where.authorId = { [Op.eq]: user }
    if (terms) where.content = { [Op.like]: `%${terms}%` }

    output = id
      ? Msg.findById(parseInt(id))
      : Msg.findAll({
          where,
          limit: limit ? parseInt(limit) : 50,
          offset: offset ? parseInt(offset) : 0,
          include
        })

    // Console.log(output)
    return output
  } catch (err) {
    Console.error(err)
    return err
  }
}

module.exports = msg
