const { Op } = require('../db')
const { User } = require('../models')

const skype = async params => {
  try {
    let { limit, offset } = params,
      output,
      where = {}

    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null

    where = {
      [Op.or]: [
        { lookup: { [Op.ne]: null } },
        { socialSkype: { [Op.ne]: null, [Op.ne]: '' } }
      ]
    }

    output = await User.findAll({
      attributes: ['id', 'name', 'lookup', 'socialSkype'],
      where,
      limit,
      offset,
      order: [['name', 'ASC']]
    })

    const bad = [68, 991, 9217, 1209]

    output = output
      .filter(o => {
        return (
          (o.socialSkype || (o.lookup ? o.lookup.skype : null)) &&
          !bad.includes(o.id)
        )
      })
      .map(o => {
        return {
          id: o.id,
          name: o.name,
          sk: o.socialSkype || (o.lookup ? o.lookup.skype : null)
        }
      })

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = skype
