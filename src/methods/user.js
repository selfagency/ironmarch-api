const { Op } = require('../db')
const { User } = require('../models')

const user = async params => {
  try {
    let { id, limit, offset, sort, order, terms, dox } = params,
      output,
      include = [],
      where = {}

    id = id ? parseInt(id) : null
    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null
    sort = sort ? sort : 'id'
    order = order ? [[sort, order]] : [[sort, 'DESC']]
    dox = dox === 'true' ? true : null

    include.push({ association: 'statuses', order: [['date', 'DESC']] })
    if (terms) where.name = { [Op.like]: `%${terms}%` }
    if (dox) where.lookup = { [Op.ne]: null }

    if (id) {
      output = await User.findOne({ where: { id: { [Op.eq]: id } }, order, include })
    } else {
      output =
        id === 0
          ? null
          : await User.findAll({
              where,
              limit,
              offset,
              include,
              order: [['name', 'ASC']]
            })
    }

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = user
