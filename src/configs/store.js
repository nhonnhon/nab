import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './../reducers'
import thunk from 'redux-thunk'

const configStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
  )

  return store
}

const store = configStore()

export default store
