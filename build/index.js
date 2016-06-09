const fs = require('fs')
const Path = require('path')
const waterfall = require('run-waterfall')

const getModulesByCategory = require('./modules')
const syncModules = require('./sync')
const readModules = require('./read')

const modulesMarkdown = fs.readFileSync(Path.join(__dirname, '../modules.md'), 'utf8')
const modulesByCategory = getModulesByCategory(modulesMarkdown)
const moduleList = categoriesToModuleList(modulesByCategory)

function categoriesToModuleList (categories) {
  return Object.keys(categories).reduce((sofar, key) => {
    const modules = categories[key]

    modules.forEach(function(repo) {
      module.category = key
    })

    return sofar.concat(modules)
  }, [])
}
