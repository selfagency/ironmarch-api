const { Op } = require('../db')
const { User } = require('../models')

const user = async params => {
  try {
    let { id, limit, offset, sort, order, terms, identity } = params,
      output,
      include = [],
      where = {}

    id = id ? parseInt(id) : null
    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null
    sort = sort ? sort : 'id'
    order = order ? [[sort, order]] : [[sort, 'DESC']]
    identity = identity === 'true' ? true : null

    include.push({ association: 'statuses', order: [['date', 'DESC']] })
    where.lookup = identity ? { [Op.ne]: null } : null

    if (terms) {
      where = {
        [Op.or]: [
          db.where(db.fn('upper', db.col('name')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('name_alt')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('name_alt_2')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('email')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('email_alt')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('email_alt_2')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('bio')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('ideology_alt')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('geo')), { [Op.substring]: terms.toUpperCase() }),
          db.where(db.fn('upper', db.col('geoAlt')), { [Op.substring]: terms.toUpperCase() })
        ]
      }
    }

    if (id) {
      output = await User.findOne({ where: { id: { [Op.eq]: id } }, order, include })
    } else {
      output = await User.findAll({
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
