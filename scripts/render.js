const fs = require('fs')
const inu = require('inu')

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
    <script>
      window.model = ${JSON.stringify(model)}
    </script>
    <script src="bundle.js"></script>
  </body>
</html>
  `

  fs.writeFile(config.index, html, done)
}
