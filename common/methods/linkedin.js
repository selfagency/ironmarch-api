const { Op } = require('../db.js')
const { User } = require('../models.js')

const linkedin = async params => {
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
        return o.lookup.linkedin
      })
      .map(o => {
        return {
          id: o.id,
          name: o.name,
          li: o.lookup.linkedin
        }
      })

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = linkedin
