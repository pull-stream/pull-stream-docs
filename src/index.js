const inu = require('inu')
const pull = inu.pull

const router = require('./router')

const app = {
  init: () => {
    const routerState = router.init()
    return {
      model: Object.assign(window.model, {
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
    return inu.html`
      <main>
        <nav>
          ${model.modules.map((module) => {
            return inu.html`
              <a href=${`#/${module.name}`}>
                ${module.name}
              </a>
            `
          })}
        </nav>
        <h1>${model.route}</h1>
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
