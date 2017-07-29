const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const compose = require('redux').compose
const thunkMiddleware = require('redux-thunk')
const rootReducer = require('./reducers')
const createLogger = require('redux-logger')
const DevTools = require('./root.js').DevTools

global.METAMASK_DEBUG = 'GULP_METAMASK_DEBUG'

module.exports = configureStore

const loggerMiddleware = createLogger({
  predicate: () => global.METAMASK_DEBUG,
})

const middlewares = [thunkMiddleware, loggerMiddleware]

const enhancer = compose(
  applyMiddleware(...middlewares),
  DevTools.instrument(),
)
console.log("ENHANCER");
// const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer,
  )

  return store
}
