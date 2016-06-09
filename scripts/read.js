const ecosystem = require('ecosystem-docs')

const util = require('./util')
const config = require('../config')

module.exports = readModules

function readModules (modules, done) {
  const moduleList = util.toModuleList(modules)

  ecosystem.read(moduleList, {
    data: config.data
  }, (err, data) => {
    if (err) { return done(err) }

    util.reattachCategories(data, modules)

    done(null, data)
  })
}
