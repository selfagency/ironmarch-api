const { Op } = require('../db')
const dbPost = require('../models/post')

const post = params => {
  try {
    const { id, user, limit, offset, terms } = params
    let output,
      where = {}

    if (user) where.authorId = { [Op.eq]: user }
    if (terms) where.content = { [Op.like]: `%${terms}%` }

    output = id
      ? dbPost.findById(parseInt(id))
      : dbPost.findAll({
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

module.exports = post
