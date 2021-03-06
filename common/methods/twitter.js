const { Op } = require('../db.js')
const { User } = require('../models.js')

const twitter = async params => {
  try {
    let { limit, offset } = params,
      output,
      where = {}

    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null

    where = {
      [Op.or]: [{ lookup: { [Op.ne]: null } }, { socialTwitter: { [Op.ne]: null, [Op.ne]: '' } }]
    }

    output = await User.findAll({
      attributes: ['id', 'name', 'lookup', 'socialTwitter'],
      where,
      limit,
      offset,
      order: [['name', 'ASC']]
    })

    output = output
      .filter(o => {
        return o.socialTwitter || (o.lookup ? o.lookup.twitter : null)
      })
      .map(o => {
        return {
          id: o.id,
          name: o.name,
          tw: o.socialTwitter || (o.lookup ? o.lookup.twitter : null)
        }
      })

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = twitter
