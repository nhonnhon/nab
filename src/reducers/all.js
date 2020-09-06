import { fromJS } from 'immutable'
import { LIST_CITIES, DATA_CURRENT_CITY, LOADING_DATA_CITY } from '../actions/all'

const initialState = fromJS({
  defaultCity: "new york",
  listCities: [],
  dataCurrentCity: {},
  loadingDataCity: false
})

export default function all(state = initialState, { type, payload }) {
  switch (type) {
    case LIST_CITIES:
      return state.set('listCities', fromJS(payload))
    
    case DATA_CURRENT_CITY:
      return state.set('dataCurrentCity', fromJS(payload))
    
    case LOADING_DATA_CITY:
      return state.set('loadingDataCity', fromJS(payload))

    default:
      return state
  }
}