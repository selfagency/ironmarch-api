const { Op } = require('../db')
const { User } = require('../models')

const facebook = async params => {
  try {
    let { limit, offset } = params,
      output,
      where = {}

    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null

    where = { lookup: { [Op.ne]: null } }

    output = await User.findAll({
      attributes: ['id', 'name', 'lookup'],
      where,
      limit,
      offset,
      order: [['name', 'ASC']]
    })

    output = output
      .filter(o => {
        return o.lookup.facebook
      })
      .map(o => {
        return {
          id: o.id,
          name: o.name,
          fb: o.lookup.facebook
        }
      })

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = facebook
