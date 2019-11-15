require('dotenv').config()
const { Op } = require('../db')
const { User } = require('../models')
const fs = require('fs')
const got = require('got')
const uniq = require('1-liners/uniq')
const util = require('util')

const importer = async () => {
  const readFile = util.promisify(fs.readFile)
  let ips

  const users = await User.findAll()

  try {
    ips = JSON.parse(
      await readFile(`${process.cwd()}/src/data/ips.json`, 'utf-8')
    )
  } catch (_err) {
    console.error(_err)
  }

  for (let k in users) {
    let stack = []
    let query

    if (users[k].id > 8192) {
      stack.push(users[k].ip)

      const userIps = ips.filter(ip => {
        return parseInt(ip.member_id) === users[k].id
      })

      if (userIps) {
        userIps.forEach(ip => {
          stack.push(ip.ip_address)
        })

        stack = uniq(stack)

        for (let y in stack) {
          let geo, whois

          try {
            geo = (
              await got(
                `http://api.ipstack.com/${stack[y]}?access_key=${process.env.IPSTACK}`,
                {
                  json: true
                }
              )
            ).body
          } catch (err) {
            console.error(err)
          }

          try {
            whois = (
              await got(`http://whois.arin.net/rest/ip/${stack[y]}`, {
                json: true
              })
            ).body
          } catch (err) {
            console.error(err)
          }

          stack[y] = {
            ip: stack[y],
            geo,
            whois
          }
        }

        query = {
          ips: JSON.stringify(stack)
        }

        try {
          const out = await User.update(query, {
            where: { id: { [Op.eq]: users[k].id } }
          })
          console.log(out)
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
}

;(async () => {
  await importer()
})()
