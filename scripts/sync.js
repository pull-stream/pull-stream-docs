const fs = require('fs')
const ghAuth = require('ghauth')
const ecosystem = require('ecosystem-docs')

const util = require('./util')
const config = require('../config')

module.exports = syncModules

function syncModules (modules, done) {
  const moduleList = util.toModuleList(modules)

  function sync (token) {
    ecosystem.sync(moduleList, {
      data: config.data,
      token: token
    }, done)
  }

  if (process.env.GH_TOKEN) {
    sync(process.env.GH_TOKEN)
  } else {
    ghAuth({
      configName: 'ecosystem-docs',
      userAgent: 'ecosystem-docs',
      scopes: ['user']
    }, (err, auth) => {
      if (err) { return done(err) }
      sync(auth.token)
    })
  }
}

