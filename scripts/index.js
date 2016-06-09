const modules = require('./modules')
const commands = {
  sync: require('./sync'),
  html: require('./html')
}
const command = process.argv[2]

commands[command](modules, function (err) {
  if (err) throw err
})

