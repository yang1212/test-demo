import Express from 'express'
import { responseClient } from '../utils'
import BillType from '../../models/billTypeEnum'
import BillDetail from '../../models/billDetail'
import Register from '../../models/register'
const router = Express.Router()

router.post('/login', function(req, res) {
  const { objName, password } = req.body
  Register.find({'objName': objName, 'password': password}).then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/register', function(req, res) {
  const { objName, password } = req.body
  const tempData = new Register({
    objName,
    password
  })
  tempData.save().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/initTypeList', function (req, res) {
  const { code, label } = req.body
  const tempData = new BillType({
    code,
    label
  })
  tempData.save().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/typeData', function (req, res) {
  BillType.find().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})


router.post('/createBill', function (req, res) {
  const { objName, objType, objPrice, objDate } = req.body
  const tempData = new BillDetail({
    objName,
    objType,
    objPrice,
    objDate
  })
  tempData.save().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

module.exports = router