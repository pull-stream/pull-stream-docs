const css = require('sheetify')

const contribList = require('./contributor-list')

css('highlight.js/styles/agate.css')

module.exports = modulePage

function modulePage (module) {
  const el = document.createElement('article')

  el.innerHTML = module.readme

  const title = el.querySelector('.title')
  const contrib = title.querySelector('.contrib')

  title.replaceChild(contribList(module.contributors), contrib)

  return el 
}
