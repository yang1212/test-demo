import Express from 'express'
import { responseClient } from './common/utils'
import MemberInfo from '../models/MemberInfo'
const router = Express.Router()
const path = require('path')
const fs = require('fs')
const multipart = require('connect-multiparty')

const multipartMiddleware = multipart()

router.post('/uploadImgFile', multipartMiddleware, (req, res) => {
  const { name, uid, userId } = req.body
  const file = req.files
  const reader = fs.createReadStream(file.file.path)
  const stream = fs.createWriteStream(path.join('static', `${uid}${name}`))
  reader.pipe(stream)
  stream.on('finish', function() {
    MemberInfo.find({'userId': userId}).then(registerData => {
      if (registerData.length > 0) { // 已上传过信息
        MemberInfo.update({'userId': userId}, {'imgPath': `${uid}${name}`}).then(data => {
          responseClient(res, 200, 200, '请求成功', data);
        }).cancel(err=>{
          responseClient(res)
        })
      } else {
        const tempData = new MemberInfo({
          userId: userId,
          imgPath: `${uid}${name}`
        })
        tempData.save().then(data => {
          responseClient(res, 200, 200, '请求成功', data);
        }).cancel(err=>{
          responseClient(res)
        })
      }
    }).cancel(err=>{
      responseClient(res)
    })
  })
})

module.exports = router