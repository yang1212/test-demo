import Express from 'express'
import { responseClient } from '../utils'
import Images from '../../models/img'
const router = Express.Router()
const path = require('path')
const fs = require('fs')
const multipart = require('connect-multiparty')

const multipartMiddleware = multipart()

router.post('/fileData', multipartMiddleware, (req, res) => {
  const { name, uid, dateTime } = req.body
  const file = req.files
  const reader = fs.createReadStream(file.file.path)
  const stream = fs.createWriteStream(path.join('static', `${uid}${name}`))
  reader.pipe(stream)
  stream.on('finish', function() {
    const tempData = new Images({
      path: `${uid}${name}`,
      id: uid,
      name: name,
      dateTime: dateTime
    })
    tempData.save().then(data => {
      responseClient(res,200,200,'保存成功',data)
    }).cancel(err=>{
      responseClient(res)
    })
  })
})

// 查找数据内容
router.post('/imageList', function (req, res) {
  Images.find().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

module.exports = router