const { Op } = require('../db')
const { User } = require('../models')

const user = async params => {
  try {
    const { posts, messages, terms } = params

    let { id, limit, offset, sort, order } = params,
      output,
      include = [],
      where = {}

    id = id ? parseInt(id) : null
    limit = limit ? parseInt(limit) : 50
    offset = offset ? parseInt(offset) : 0
    sort = sort ? sort : 'id'
    order = order ? [[sort, order]] : [[sort, 'DESC']]

    include.push({ association: 'statuses', order: [['date', 'DESC']] })
    if (posts) include.push('posts')
    if (messages) include.push('messages')
    if (terms) where.name = { [Op.like]: `%${terms}%` }

    output = id
      ? await User.findOne({ where: { id: { [Op.eq]: id } }, order, include })
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
