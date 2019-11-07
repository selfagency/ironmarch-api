const { Op } = require('../db')
const { Msg } = require('../models')

const msg = async params => {
  try {
    const { terms } = params,
      include = ['title', 'author']

    let { id, user, limit, offset } = params,
      output,
      where = {}

    id = id ? parseInt(id) : null
    user = user ? parseInt(user) : null
    limit = limit ? parseInt(limit) : 50
    offset = offset ? parseInt(offset) : 0

    if (user) where.authorId = { [Op.eq]: user }
    if (terms) where.content = { [Op.like]: `%${terms}%` }

    output = id
      ? await Msg.findOne({ where: { id: { [Op.eq]: id } } })
      : await Msg.findAll({
          where,
          limit,
          offset,
          include
        })

    // console.log(output)
    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = msg
