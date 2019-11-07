const { Op } = require('../db')
const { User } = require('../models')

const user = async params => {
  try {
    const { posts, messages, terms } = params

    let { id, limit, offset } = params,
      output,
      include = [],
      where = {}

    id = id ? parseInt(id) : null
    limit = limit ? parseInt(limit) : 50
    offset = offset ? parseInt(offset) : 0

    if (posts) include.push('posts')
    if (messages) include.push('messages')
    if (terms) where.name = { [Op.like]: `%${terms}%` }

    output = id
      ? await User.findOne({ where: { id: { [Op.eq]: id } }, include })
      : await User.findAll({
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

module.exports = user
