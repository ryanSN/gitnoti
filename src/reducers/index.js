import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import github from './github'

const rootReducer = combineReducers({github, routing: routerReducer})

export default rootReducer
