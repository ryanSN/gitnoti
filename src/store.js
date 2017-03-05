import {compose, createStore} from 'redux'
import {install as reduxLoop, combineReducers} from 'redux-loop'
import {routerReducer} from 'react-router-redux'

const devTools = window.devToolsExtension ? [window.devToolsExtension()] : []
const enhancers = [reduxLoop(), ...devTools]

export const reducers = combineReducers({
  routing: routerReducer
})

export default createStore(
  reducers,
  compose(...enhancers)
)
