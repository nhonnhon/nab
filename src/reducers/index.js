import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import all from './all'

const rootReducer = combineReducers({ router: routerReducer, all })

export default rootReducer
