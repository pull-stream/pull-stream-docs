const hashMatch = require('hash-match')
const Pushable = require('pull-pushable')

// routing demo
module.exports = {

  init: () => ({
    model: formatHash(window.location.hash),
    effect: { type: 'router:init' }
  }),

  update: (model, action) => {
    switch (action.type) {
      case 'router:set':
        return { model: action.payload }
      default:
        return { model }
    }
  },

  run: (effect, actions) => {
    if (effect.type === 'router:init') {
      var effectActions
      const handleLocationChange = () => {
        effectActions.push({
          type: 'router:set',
          payload: formatHash(window.location.hash)
        })
      }
      effectActions = Pushable((err) => {
        window.removeEventListener(handleLocationChange)
      })
      window.addEventListener('hashchange', handleLocationChange)
      return effectActions
    }
  }
}

function formatHash (hash) {
  return hashMatch(hash).slice(1) || null
}
