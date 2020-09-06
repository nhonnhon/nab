import axios from 'axios'

const BASE_URL = "http://api.weatherapi.com/v1/"

let headersDefault = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: headersDefault,
  timeout: 120000,
})

function customFetch(url, method, body = {}, customOptions = {}) {
  return new Promise((resolve, reject) => {
    let optionDetect = {}
    if (method === 'GET' || method === 'PATCH') {
      optionDetect = {
        params: {
          ...body,
        },
      }
    }
    if (method === 'POST' || method === 'PUT') {
      optionDetect = {
        data: {
          ...body,
        },
      }
    }
    const options = {
      method,
      url,
      ...optionDetect,
      ...customOptions,
    }

    api
      .request(options)
      .then((response) => {
        const result = response.data
        const status = response.status

        if (status === 200 || status === 201) {
          resolve({ data: result })
        } else {
          reject({ error: result })
        }
      })
      .catch((error) => {
        alert('Something went wrong')
        reject({ error: error })
      })
  })
}

function post(url, body, options) {
  return customFetch(url, 'POST', body, options)
}

function get(url, body, options) {
  return customFetch(url, 'GET', body, options)
}

function put(url, body, options) {
  return customFetch(url, 'PUT', body, options)
}

function patch(url, body, options) {
  return customFetch(url, 'PATCH', body, options)
}

function _delete(url, body, options) {
  return customFetch(url, 'DELETE', body, options)
}

export default {
  post,
  get,
  put,
  _delete,
  patch,
}
