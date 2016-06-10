const css = require('sheetify')

css('highlight.js/styles/agate.css')

module.exports = modulePage

function modulePage (module) {
  const el = document.createElement('article')
  el.innerHTML = module.readme
  return el 
}
