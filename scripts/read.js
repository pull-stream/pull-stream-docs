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

    done(null, formatData(modules, data))
  })
}

function formatData (origModules, data) {
  var contributors = []
  return {
    contributors: contributors,
    modules: data.map((module) => {
      return {
        user: module.user,
        name: module.name,
        path: module.path,
        name: module.name,
        stars: module.stars,
        issues: module.issues,
        contributors: indexContributors(contributors, module.contributors),
        version: module.package && module.package.version || false,
        npmName: module.package && module.package.name || false,
        category: getCategory(origModules, module)
      }
    })
  }
}

function indexContributors (indexed, contributors) {
  return contributors.map((contributor) => {
    const formatted = formatContributor(contributor)
    const index = indexed.findIndex(c => c.name === formatted.name)
    if (index === -1) {
      indexed.push(formatted)
      return indexed.length - 1
    } else {
      return index
    }
  })
}

function formatContributor (contributor) {
  return {
    name: contributor.login,
    avatar: contributor.avatar_url
  }
}

function getCategory (modulesWithCategory, module) {
  return modulesWithCategory
    .find((moduleWithCategory) => {
      return module.path === moduleWithCategory.path
    })
    .category
}
