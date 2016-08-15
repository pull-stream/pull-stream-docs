const fs = require('fs')
const Path = require('path')
const remark = require('remark')
const assert = require('assert')

const config = require('../config')

module.exports = getModulesByCategory(
  fs.readFileSync(config.modules, 'utf8')
)

function getModulesByCategory (modulesMarkdown) {
  const ast = remark.parse(String(modulesMarkdown))
  const modules = []

  var category = null
  
  ast.children.forEach((node) => {
    const type = node.type

    if (type === 'heading') {
      return category = remark
        .stringify(node)
        .replace(/^\#+/g, '')
        .trim()
    } else if (type !== 'list' || category === null) {
      return
    }

    node.children.forEach((listItem) => {
      // TODO why error on stringify(listItem) ?
      assert.equal(listItem.children.length, 1, 'list item should have only one child.')
      const modulePath = remark.stringify(listItem.children[0])
      modules.push({
        path: modulePath,
        category
      })
    })
  })

  return modules
}
