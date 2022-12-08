import Api from './axios'
// Start Get Helper Mthods
export function getMethods(uri, params) {
  let defultParams = {
    limit: 10,
    offset: 0,
    field: 'id',
    sort: 'desc',
    resource: 'all',
    deleted: 'false',
    paginate: 'true',
    columns: ['active'],
    operand: ['='],
    column_values: [1],
  }
  if (typeof defultParams !== undefined) {
    defultParams = {
      ...defultParams,
      ...params,
    }
  }
  return new Promise((resolve, reject) => {
    Api.get(`${uri}`, {
      params: {
        ...defultParams,
      },
      headers: {
        language: !process.server ? localStorage.getItem('lang') : 'ar',
        Authorization: !process.server
          ? localStorage.getItem('auth._token.local')
          : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        if (error.response) {
          error.response.status == 400
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 401
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 404
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 500
            ? console.log(error.response.data.message)
            : 'no'
        }
        reject(error)
      })
  })
}
// End Get Helper Mthods
// Start Post Helper Mthods
export function postMethods(uri, payload) {
  return new Promise((resolve, reject) => {
    Api.post(`${uri}`, payload, {
      headers: {
        language: !process.server ? localStorage.getItem('lang') : 'ar',
        Authorization: !process.server
          ? localStorage.getItem('auth._token.local')
          : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        if (error.response) {
          error.response.status == 400
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 401
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 404
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 500
            ? console.log(error.response.data.message)
            : 'no'
        }
        reject(error)
      })
  })
}
// End Post Helper Mthods
// Start Put Helper
export function putMethods(uri, payload) {
  return new Promise((resolve, reject) => {
    Api.put(`${uri}`, payload, {
      headers: {
        language: !process.server ? localStorage.getItem('lang') : 'ar',
        Authorization: !process.server
          ? !process.server
            ? localStorage.getItem('auth._token.local')
            : null
          : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        if (error.response) {
          error.response.status == 400
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 401
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 404
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 500
            ? console.log(error.response.data.message)
            : 'no'
        }
        reject(error)
      })
  })
}
// End Put Helper
// Start delete Helper
export function deleteMethods(uri, payload) {
  return new Promise((resolve, reject) => {
    Api.delete(`${uri}`, {
      params: payload,
      headers: {
        language: !process.server ? localStorage.getItem('lang') : 'ar',
        Authorization: !process.server
          ? localStorage.getItem('auth._token.local')
          : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        if (error.response) {
          error.response.status == 400
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 401
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 404
            ? console.log(error.response.data.message)
            : 'no'
          error.response.status == 500
            ? console.log(error.response.data.message)
            : 'no'
        }
        reject(error)
      })
  })
}
// End delete Helper
