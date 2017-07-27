const inherits = require('util').inherits
const Component = require('react').Component
const Provider = require('react-redux').Provider
const h = require('react-hyperscript')
const App = require('./app')

const createDevTools = require('redux-devtools').createDevTools
const LogMonitor = require('redux-devtools-log-monitor')
const DockMonitor = require('redux-devtools-dock-monitor')

// const dockMonitorProps = {
//   toggleVisibilityKey: "ctrl-h",
//   changePositionKey: "ctrl-w",
//   defaultIsVisible: 'true',
//   defaultPosition: 'bottom',
// }
// console.log("dockmonitorProps:", dockMonitorProps);

// const inputToCreateDevTools = h(
//   DockMonitor,
//   {
//     ...dockMonitorProps
//   },
//   LogMonitor,
// );

// console.log("input:", inputToCreateDevTools, typeof inputToCreateDevTools);


// const DevTools = createDevTools(
//   inputToCreateDevTools,
// );

module.exports = Root

inherits(Root, Component)
function Root () { Component.call(this) }

Root.prototype.render = function () {
  return (

    h(Provider, {
      store: this.props.store,
    }, [h(App)])
  )
}
