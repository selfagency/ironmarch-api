const { Op } = require('../db')
const { Post } = require('../models')

const post = async params => {
  try {
    const { user, terms } = params,
      include = ['author']

    let { id, limit, offset } = params,
      output,
      where = {}

    id = id ? parseInt(id) : null
    limit = limit ? parseInt(limit) : 50
    offset = offset ? parseInt(offset) : 0

    if (user) where.authorId = { [Op.eq]: user }
    if (terms) where.content = { [Op.like]: `%${terms}%` }

    output = id
      ? await Post.findOne({ where: { id: { [Op.eq]: id } } })
      : await Post.findAll({
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

module.exports = post
