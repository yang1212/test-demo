import { post } from '../../common/js/require'

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
