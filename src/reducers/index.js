import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import { items, itemsHasErrored, itemsIsLoading } from './items'

const rootReducer = combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  routing: routerReducer
})

export default rootReducer
