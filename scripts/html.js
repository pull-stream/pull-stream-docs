const ecosystem = require('ecosystem-docs')

const config = require('../config')
const util = require('./util')
const read = require('./read')
const render = require('./render')

module.exports = html

function html (modules, done) {
  read(modules, function (err, modules) {
    if (err) { return done(err) }

    render(modules, done)
  })
}
