import Express from 'express'
import { responseClient } from './common/utils'
import Register from '../models/register'
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
    Register.update({'_id': userId}, {'imgPath': `${uid}${name}`}).then(data => {
      responseClient(res, 200, 200, '请求成功', data);
    }).cancel(err=>{
      responseClient(res)
    })
  })
})

module.exports = router