const inu = require('inu')
const pull = inu.pull

const app = {
  init: () => ({
    model: window.model
  }),
  update: (model, action) => {
    return { model: model }
  },
  view: (model) => inu.html`
    <main>pull-stream!</main>
  `
}

const main = document.querySelector('main')

pull(
  inu.start(app).views(),
  pull.drain((view) => {
    inu.html.update(main, view)
  })
)
