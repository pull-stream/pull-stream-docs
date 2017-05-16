const fs = require('fs')
const Path = require('path')
const ecosystem = require('ecosystem-docs')
const remark = require('remark')
const html = require('remark-html')
const highlight = require('remark-highlight.js')
const cheerio = require('cheerio')

const util = require('./util')
const config = require('../config')

module.exports = readModules

function readModules (modules, done) {
  const moduleList = util.toModuleList(modules)

  ecosystem.read(moduleList, {
    data: config.data
  }, (err, data) => {
    if (err) { return done(err) }

    data = formatData(modules, data)

    const coreModule = data.modules.find((module) => {
      return module.category === 'core'
    })
    getCoreModules(coreModule, config.core).map((module) => {
      data.modules.push(module)
    })
    coreModule.category = null

    done(null, data)
  })
}

function formatData (origModules, data) {
  const contributors = []
  const categories = []
  return {
    contributors: contributors,
    categories: categories,
    modules: data.map((module) => {
      const category = getCategory(origModules, module)
      if (categories.indexOf(category) === -1) categories.push(category)
      return {
        user: module.user,
        name: module.name,
        path: module.path,
        name: module.name,
        stars: module.stars,
        issues: module.issues,
        readme: formatReadme(module),
        contributors: indexContributors(contributors, module.contributors),
        version: module.package && module.package.version || false,
        npmName: module.package && module.package.name || false,
        category: category
      }
    })
  }
}

function indexContributors (indexed, contributors) {
  return contributors.map((contributor) => {
    const formatted = formatContributor(contributor)
    const index = indexed.findIndex(c => c.name === formatted.name)
    if (index === -1) {
      indexed.push(formatted)
      return indexed.length - 1
    } else {
      return index
    }
  })
}

function formatContributor (contributor) {
  return {
    name: contributor.login,
    image: contributor.avatar_url
  }
}

function formatReadme (module) {
  const ast = remark.parse(module.readme)

  // remove all content before the first heading
  for (var i = 0; i < ast.children.length; i++) {
    var child = ast.children[i]
    if (child.type === 'heading') break
    ast.children.splice(i--, 1)
  }

  // ensure there's only one <h1> in the document,
  // and that <h1/h2>'s that are code-only are at least <h3>
  for (; i < ast.children.length; i++) {
    var child = ast.children[i]
    if (child.type !== 'heading') continue
    if (child.depth === 1) child.depth = 2
    if (child.depth === 2) {
      if (child.children.length !== 1) continue
      if (child.children[0].type !== 'inlineCode') continue
      child.depth = 3
    }
  }

  var $ = cheerio.load(
    remark()
      .use([html, highlight])
      .process(remark.stringify(ast))
  )

  // Remove badges
  $('img[src*="://img.shields.io"]').remove()
  $('img[src*="://badges.github.io"]').remove()
  $('img[src*="://nodei.co"]').remove()
  $('img[src*="://david-dm.org"]').remove()
  $('img[src*="://badge.fury.io"]').remove()
  $('img[src*="://travis-ci.org"]').remove()
  $('img[src*="://secure.travis-ci.org"]').remove()
  $('img[src*="://ci.testling.com"]').remove()
  $('img[src*="://coveralls.io"]').remove()
  $('img[src*="://circleci.com"]').remove()

  $('h1 img').remove()

  // Resolve relative URLs in READMEs for images and anchors
  $('a:not([href^=http]):not([href^=#])').each(function(i,el) {
    var $a = $(el)
    $a.attr('href', 'http://github.com/' + module.path + '/blob/master/' + (module.subpath ? `docs/${module.subpath}/../` : '') + $a.attr('href'))
  })

  $('img:not([src^=http])').each(function(i,el) {
    var $img = $(el)
    $img.attr('src', 'https://raw.githubusercontent.com/' + module.path + '/master/' (module.subpath ? `docs/${module.subpath}/../` : '') + $img.attr('src'))
  })

  // guarantee that the first heading is an <h1>,
  // and wrap it up in an <a> link to the repository.
  var headings = $('h1, h2, h3, h4, h5, h6')
  if (headings && headings[0] && module.path) {
    $(headings[0]).replaceWith($(
        '<h1 class="title">'
      + '<a target="_blank" href="https://github.com/'+module.path+ (module.subpath ? `/blob/master/docs/${module.subpath}.md` : '')+'">'
      + $(headings[0]).text()
      + '</a>'
      + '<div class="contrib"></div>'
      + '</h1>'
    ))
  }
  
  return $.html()
}

function getCategory (modulesWithCategory, module) {
  return modulesWithCategory
    .find((moduleWithCategory) => {
      return module.path === moduleWithCategory.path
    })
    .category
}

function getCoreModules (coreModule, corePath) {
  const modules = []

  ;['pull'].forEach((moduleName) => {
    modules.push(readCoreModule(coreModule, corePath, moduleName, moduleName))
  })

  ;['sources', 'throughs', 'sinks'].forEach((type) => {
    const typePath = Path.join(corePath, type)
    const moduleNames = fs.readdirSync(typePath)
      .filter(p => p.endsWith('.js'))
      .filter(p => p !== 'index.js')
      .map(p => p.slice(0, -3))

    moduleNames.forEach((moduleName) => {
      const modulePath = Path.join(type, moduleName)
      modules.push(readCoreModule(coreModule, corePath, moduleName, modulePath))
    })
  })

  return modules
}

function readCoreModule (coreModule, corePath, moduleName, modulePath) {
  const requirePath = Path.join(coreModule.name, modulePath)
  const readmePath = Path.join(corePath, 'docs', modulePath + '.md')

  var readme
  try {
    readme = fs.readFileSync(readmePath, 'utf8')
  } catch (err) {
    if (err.code !== 'ENOENT') { throw err }
    readme = `# ${requirePath}`
  }

  var module = {
    user: coreModule.user,
    name: moduleName,
    path: coreModule.path,
    subpath: modulePath,
    stars: coreModule.stars,
    issues: coreModule.issues,
    readme: readme,
    contributors: coreModule.contributors,
    version: coreModule.package && coreModule.package.version || false,
    npmName: coreModule.package && coreModule.package.name || false,
    category: coreModule.category
  }
  return Object.assign(module, {
    readme: formatReadme(module)
  })
}
