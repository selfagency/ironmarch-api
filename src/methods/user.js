const { Op } = require('../db')
const { User } = require('../models')
const fullcontact = require('../services/fullcontact')
const ipstack = require('../services/ipstack')

const user = async params => {
  try {
    const { posts, messages, terms } = params

    let { id, limit, offset, sort, order } = params,
      output,
      include = [],
      where = {}

    id = id ? parseInt(id) : null
    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null
    sort = sort ? sort : 'id'
    order = order ? [[sort, order]] : [[sort, 'DESC']]

    include.push({ association: 'statuses', order: [['date', 'DESC']] })
    if (posts) include.push('posts')
    if (messages) include.push('messages')
    if (terms) where.name = { [Op.like]: `%${terms}%` }

    if (id) {
      output = await User.findOne({ where: { id: { [Op.eq]: id } }, order, include })

      if (output) {
        const [lookup, geo] = await Promise.all([fullcontact({ email: output.email }), ipstack({ ip: output.ip })])
        output.dataValues.lookup = lookup
        output.dataValues.geo = geo
      }
    } else {
      output =
        id === 0
          ? null
          : await User.findAll({
              where,
              limit,
              offset,
              include
            })
    }

    console.log(output)
    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = user
