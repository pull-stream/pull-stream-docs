const Path = require('path')

module.exports = {
  data: Path.join(__dirname, '.data'),
  modules: Path.join(__dirname, 'modules.md'),
  index: Path.join(__dirname, 'src/index.html'),
  model: Path.join(__dirname, 'src/model.json'),
  core: Path.join(__dirname, 'node_modules/pull-stream')
}
