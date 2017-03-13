import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers/pullRequests'

const loggerMiddleware = createLogger()

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState, enhancers)
}
