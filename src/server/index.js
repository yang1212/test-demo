import { post } from '../common/js/require'

export function register (params) {
  let url = '/billType/register'
  return new Promise((resolve, reject) => {
    post(url, params).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}

export function login (params) {
  let url = '/billType/login'
  return new Promise((resolve, reject) => {
    post(url, params).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}

export function billTypeData (param) {
  let url = '/billType/initTypeList'
  return new Promise((resolve, reject) => {
    post(url, param).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}

export function getTypeData () {
  let url = '/billType/typeData'
  return new Promise((resolve, reject) => {
    post(url).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}

export function createBill (param) {
  let url = '/billType/createBill'
  return new Promise((resolve, reject) => {
    post(url, param).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}
