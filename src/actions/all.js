import { Api } from '../services'

const APIKEY = '208ff99bc83a45dbab574958200509'
const search = 'search.json'
const forecast = 'forecast.json'
const days = 5

export const LIST_CITIES = 'LIST_CITIES'
export const DATA_CURRENT_CITY = 'DATA_CURRENT_CITY'
export const LOADING_DATA_CITY = 'LOADING_DATA_CITY'

const updateListCites = (data) => {
  return ({
    type: LIST_CITIES,
    payload: data
  })
}

const updateDataCurrentCity = (data) => {
  return ({
    type: DATA_CURRENT_CITY,
    payload: data
  })
}

const loadingDataCity = (isLoading) => {
  return ({
    type: LOADING_DATA_CITY,
    payload: isLoading
  })
}

function searchCities(cityName, successCB) {
  return (dispatch) => {
    Api.get(`${search}?key=${APIKEY}&q=${cityName}`)
      .then(({ data }) => {
        dispatch(updateListCites(data))
      })
      .catch(() => {})
  }
}

function getResultCity(cityName) {
  return (dispatch) => {
    dispatch(loadingDataCity(true))
    Api.get(`${forecast}?key=${APIKEY}&q=${cityName}&days=${days}`)
      .then(({ data }) => {
        dispatch(loadingDataCity(false))
        dispatch(updateDataCurrentCity(data))
      })
      .catch(() => {
        dispatch(loadingDataCity(false))
      })
  }
}

export {
  searchCities,
  getResultCity
}