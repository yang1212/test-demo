import { postFile } from '../common/js/imgRequire'

export function uploadImgFile (params) {
  let url = '/imgData/uploadImgFile'
  return new Promise((resolve, reject) => {
    postFile(url, params).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}
