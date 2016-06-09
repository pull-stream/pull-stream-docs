function toModuleList (modules) {
  return modules.map(module => module.path)
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
  indexByCategory: indexByKey.bind(null, 'category')
}
