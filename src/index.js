const fs = require('fs')
const inu = require('inu')
const pull = inu.pull
const find = require('array-find')
const css = require('sheetify')

const model = JSON.parse(
  fs.readFileSync(__dirname + '/model.json', 'utf8')
)

const router = require('./router')
const nav = require('./views/nav')
const modulePage = require('./views/module-page')

const prefix = css`
  :host {
    display: flex;
  }
`

const app = {
  init: () => {
    const routerState = router.init()
    return {
      model: Object.assign(model, {
        modules: model.modules.map((module) => {
          return Object.assign(module, {
            contributors: deIndexContributors(model.contributors, module.contributors)
          })
        }),
        route: routerState.model
      }),
      effect: routerState.effect
    }
  },
  update: (model, action) => {
    const domain = action.type.split(':')[0]
    if (domain === 'router') {
      return {
        model: Object.assign({}, model, {
          route: router.update(model, action).model
        })
      }
    }
    return { model: model }
  },
  view: (model) => {
    const route = model.route || 'pull-stream'
    const module = find(model.modules, (module) => {
      return module.name === route
    })

    return inu.html`
      <main class=${prefix}>
        ${nav(model)}
        ${modulePage(module)}
      </main>
    `
  },
  run: router.run
}

const main = document.querySelector('main')

pull(
  inu.start(app).views(),
  pull.drain((view) => {
    inu.html.update(main, view)
  })
)

function deIndexContributors (indexed, contributors) {
  return contributors.map((index) => indexed[index])
}
