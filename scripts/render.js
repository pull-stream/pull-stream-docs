const fs = require('fs')
const inu = require('inu')
const parallel = require('run-parallel')

const config = require('../config')

module.exports = render

function render (model, done) {
  const doctype = '<!DOCTYPE html>\n' 
  const html = doctype + inu.html`
<html lang="en-us">
  <head>
    <title>pull-stream</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="bundle.css">
  </head>
  <body>
    <main></main>
    <script src="bundle.js"></script>
  </body>
</html>
  `

  parallel([
    (cb) => {
      fs.writeFile(config.index, html, cb)
    },
    (cb) => {
      fs.writeFile(config.model, JSON.stringify(model), cb)
    }
  ], done)
}
