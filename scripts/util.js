function toModuleList (modules) {
  return modules.map(module => module.path)
}

function reattachCategories (modules, modulesWithCategories) {
  return modules.map(module => {
    const category = modulesWithCategories
      .find((moduleWithCategory) => {
        return module.path === moduleWithCategory.path
      })
      .category

    return Object.assign(module, { category })
  })
}

function indexByKey (key, array) {
  return array.reduce((sofar, value) => {
    const index = value[key]
    return Object.assign(sofar, {
      [index]: sofar[index] === undefined
        ? [value]
        : sofar[index].concat([value])
    })
  }, {})
}

module.exports = {
  toModuleList,
  reattachCategories,
  indexByCategory: indexByKey.bind(null, 'category')
}
