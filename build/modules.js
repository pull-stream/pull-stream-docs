const Path = require('path')
const remark = require('remark')
const assert = require('assert')

module.exports = getModulesByCategory

function getModulesByCategory (modulesMarkdown) {
  const ast = remark.parse(String(modulesMarkdown))
  const modules = {}

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

    modules[category] = node.children.map((listItem) => {
      // TODO why error on stringify(listItem) ?
      assert.equal(listItem.children.length, 1, 'list item should have only one child.')
      return remark.stringify(listItem.children[0])
    })
  })

  return modules
}
