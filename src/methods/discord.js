const { Op } = require('../db')
const { Post, Msg, User } = require('../models')
const uniqBy = require('1-liners/uniqBy')

const discord = async params => {
  try {
    let { limit, offset } = params,
      output = [],
      outputA,
      outputB,
      outputC,
      where = {}

    limit = limit ? parseInt(limit) : null
    offset = offset ? parseInt(offset) : null

    where = {
      [Op.or]: [{ content: { [Op.like]: '%discord.gg%' } }]
    }

    outputA = await Post.findAll({
      attributes: ['content', 'authorId'],
      where,
      limit,
      offset
    })

    outputB = await Msg.findAll({
      attributes: ['content', 'authorId'],
      where,
      limit,
      offset
    })

    outputC = [...outputA, ...outputB]

    for (let item of outputC) {
      let url = item.content.match(/discord\.gg\/(\w|\d){6,}/g)

      if (url) {
        const user = await User.findOne({
          where: { id: { [Op.eq]: item.authorId } },
          attributes: ['id', 'name']
        })

        url = `https://${url[0]}`

        output.push({
          url,
          user
        })
      }
    }

    output = uniqBy(output, o => o.url)

    return output
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = discord
