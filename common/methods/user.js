const { Op } = require('../db.js')
const { User } = require('../models.js')

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
          db.where(db.fn('upper', db.col('name')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('name_alt')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('name_alt_2')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('email')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('email_alt')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('email_alt_2')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('bio')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('bio_alt')), {
            [Op.substring]: terms.toUpperCase()
          }),
          db.where(db.fn('upper', db.col('geo')), {
            [Op.substring]: terms.toUpperCase()
          })
        ]
      }
    }

    if (id) {
      output = await User.findOne({
        where: { id: { [Op.eq]: id } },
        order,
        include
      })
    } else {
      output = await User.findAll({
        attributes: ['id', 'name', 'nameAlt', 'nameAlt2', 'email', 'emailAlt2', 'geo', 'lookup', 'dossier'],
        where,
        limit,
        offset,
        order: [['name', 'ASC']]
      })
    }

    if (identity) {
      output = output.filter(user => {
        return user.lookup.fullName !== null && user.lookup.fullName !== ''
      })
    }

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = user
