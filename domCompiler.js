var React = require('react')
var ReactDOM = require('react-dom')

module.exports = function domCompiler (registry, el, store) {
  var directives = getDirectivesFor(registry, el)

  directives.forEach(D => {
    var items = [
      {id: 1, name: "Herp", email: "Herp@derp.com"},
      {id: 2, name: "Derp", email: "Derp@herp.com"}
    ]

    var props = Object.assign({},
      D.mapState && D.mapState(store.getState()) || {},
      D.mapState && D.mapDispatch(store.dispatch) || {})
    
    ReactDOM.render(<D {...props} />, el)
  })

  toArray(el.children).forEach(child => domCompiler(registry, child, store))
}

function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

function getDirectivesFor(registry, el) {
  return toArray(el.classList)
    .reduce((dirs, className) => {
      if (registry[className]) dirs.push(registry[className])
      return dirs
  }, [])
}