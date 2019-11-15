const { Op } = require('../db')
const { Post } = require('../models')

const post = async params => {
  try {
    const { user, terms } = params,
      include = [{ association: 'author', attributes: ['id', 'name'] }]

    let { id, limit, offset, sort, order } = params,
      output,
      where = {}

    id = id ? parseInt(id) : null
    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null
    sort = sort ? sort : 'date'
    order = order ? [[sort, order]] : [[sort, 'DESC']]

    if (user) where.authorId = { [Op.eq]: user }
    if (terms) where.content = { [Op.like]: `%${terms}%` }

    output = id
      ? await Post.findOne({ where: { id: { [Op.eq]: id } }, order, include })
      : await Post.findAll({
          attributes: ['id', 'authorId', 'date', 'content'],
          where,
          limit,
          offset,
          include,
          order
        })

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = post
