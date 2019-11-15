const { User } = require('../models')

const sorter = arr => {
  let stack = []

  for (let item in arr) {
    stack.push([item, arr[item]])
  }

  stack.sort((a, b) => b[1] - a[1])

  return stack
}

const locales = async () => {
  try {
    const users = await User.findAll()
    let cities = {},
      regions = {},
      countries = {}

    users.forEach(user => {
      if (user.geo) {
        cities[user.geo.city]
          ? cities[user.geo.city]++
          : (cities[user.geo.city] = 1)
        regions[user.geo.region_name]
          ? regions[user.geo.region_name]++
          : (regions[user.geo.region_name] = 1)
        countries[user.geo.country_name]
          ? countries[user.geo.country_name]++
          : (countries[user.geo.country_name] = 1)
      }
    })

    cities = sorter(cities)
    regions = sorter(regions)
    countries = sorter(countries)

    return {
      cities,
      regions,
      countries
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = locales
