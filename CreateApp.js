var redux = require('redux')

module.exports = function CreateApp(registry, compile, rootEl) {
  var initialState = {
    users: [{
        id: 1,
        name: "Herp",
        email: "Herp@derp.com"
      },
      {
        id: 2,
        name: "Derp",
        email: "Derp@herp.com"
      }
    ]
  }

  var store = redux.createStore(
    function (state, action) {
      switch (action.type) {
        case 'addItem':
          return Object.assign(state, {
            users: state.users.concat(action.data)
          })
        default:
          return state
      }
    },
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  var directives = compile(registry, rootEl, store)

  return {
    directives,
    rootEl
  }
}