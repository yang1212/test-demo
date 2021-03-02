import { postFile } from '../../common/js/imgRequire'
import { post } from '../../common/js/require'

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

export function getImageData () {
  let url = '/imgData/imageList'
  return new Promise((resolve, reject) => {
    post(url).then((res) => {
      resolve(res)
    }).catch((data) => {
      reject(data)
    })
  })
}
