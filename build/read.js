const ecosystem = require('ecosystem-docs')

const config = require('../config')

module.exports = readModules

function readModules (moduleList, done) {
  ecosystem.read(moduleList, {
    data: config.data
  }, (err, data) => {
    if (err) { return done(err) }

    done(null, data)
  })
}
