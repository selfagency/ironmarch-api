const { Op } = require('../db')
const { Msg } = require('../models')

const msg = async params => {
  try {
    const { terms } = params,
      include = [
        {
          association: 'thread'
        },
        { association: 'author', attributes: ['id', 'name'] }
      ]

    let { id, user, limit, offset, sort, order } = params,
      output,
      where = {}

    id = id ? parseInt(id) : null
    user = user ? parseInt(user) : null
    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null
    sort = sort ? sort : 'date'
    order = order ? [[sort, order]] : [[sort, 'DESC']]

    if (user) where.authorId = { [Op.eq]: user }
    if (terms) where.content = { [Op.like]: `%${terms}%` }

    output = id
      ? await Msg.findOne({ where: { id: { [Op.eq]: id } }, order, include })
      : await Msg.findAll({
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

module.exports = msg
