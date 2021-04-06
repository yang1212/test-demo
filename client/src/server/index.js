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

export function getMemberInfo (params) {
  let url = '/billType/getMemberInfo'
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

export function billDetailList (param) {
  let url = '/billType/billDetailList'
  return new Promise((resolve, reject) => {
    post(url, param).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}

export function delListData (param) {
  let url = '/billType/delListData'
  return new Promise((resolve, reject) => {
    post(url, param).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}

export function forTimeCount (param) {
  let url = '/billType/forTimeCount'
  return new Promise((resolve, reject) => {
    post(url, param).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}

export function forYearCount (param) {
  let url = '/billType/forYearCount'
  return new Promise((resolve, reject) => {
    post(url, param).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}
