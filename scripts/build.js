const ecosystem = require('ecosystem-docs')

const config = require('../config')
const util = require('./util')
const read = require('./read')

module.exports = build

function build (modules, done) {
  read(modules, function (err, modules) {
    if (err) { return done(err) }

    const modulesByCategory = util.indexByCategory(modules)

  })
}
