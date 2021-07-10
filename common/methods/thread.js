const { Op } = require('../db.js')
const { Msg } = require('../models.js')

const thread = async params => {
  try {
    let { id } = params,
      output
    id = id ? parseInt(id) : null

    output = await Msg.findAll({
      where: {
        threadId: { [Op.eq]: id }
      },
      order: [['date', 'ASC']],
      include: ['author']
    })

    return output ? output : false
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = thread
