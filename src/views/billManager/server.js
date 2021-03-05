import { post } from '../../common/js/require'

export function billTypeData () {
  let url = '/billType/initTypeList'
  return new Promise((resolve, reject) => {
    post(url).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}
