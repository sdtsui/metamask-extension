const inherits = require('util').inherits
const Component = require('react').Component
const Provider = require('react-redux').Provider
const h = require('react-hyperscript')
const App = require('./app')

const React = require('react');
const createDevTools = require('redux-devtools').createDevTools;
const LogMonitor = require('redux-devtools-log-monitor').default;
const DockMonitor = require('redux-devtools-dock-monitor').default;

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w"
    defaultIsVisible={true}
    defaultPosition='bottom'
  >
    <LogMonitor />
  </DockMonitor>
);

debugger;

inherits(Root, Component)
function Root () { Component.call(this) }

Root.prototype.render = function () {
  console.log("BEFORE RENDER: ROOT");
  return (
    <Provider store={this.props.store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>
  )
}

module.exports = {
  Root,
  DevTools
}
