import { postFile } from '../../common/js/imgRequire'

export function sumbitImgData (params) {
  let url = '/imgData/fileData'
  return new Promise((resolve, reject) => {
    postFile(url, params).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}
