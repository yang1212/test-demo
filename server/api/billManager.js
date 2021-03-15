import Express from 'express'
import { responseClient } from '../utils'
import { handleCountData, handlBillDeatailList } from '../index'
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
  Register.find({'objName': objName}).then(data => {
    if (data.length === 0) { // 未有相同账号注册
      const tempData = new Register({
        objName,
        password
      })
      tempData.save().then(data => {
        responseClient(res, 200, 200, '请求成功', data)
      }).catch(err => {
        responseClient(res)
      })
    } else {
      responseClient(res, 200, 403, '该账号已注册', data)
    }
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/initTypeList', function (req, res) { // 初始化类型，可通过postman，无需写这个接口
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

router.post('/billDetailList', function (req, res) { // 根据类型过滤出对应的数据
  const { objType } = req.body
  if (objType) {
    BillDetail.find({ objType: objType }).then(data => {
      responseClient(res, 200, 200, '请求成功', data)
    }).catch(err => {
      responseClient(res)
    })
  } else {
    BillDetail.find().then(data => {
      BillType.find().then(typeData => {
        const tempData = handlBillDeatailList(data, typeData)
        responseClient(res, 200, 200, '请求成功', tempData)
      })
    }).catch(err => {
      responseClient(res)
    })
  }
})

// forTimeCount
router.post('/forTimeCount', function (req, res) { // 根据时间区间得到数据，并累加
  const { startDate, endDate } = req.body
  BillDetail.find({ objDate: {$lte:endDate, $gte:startDate} }).then(data => {
    BillType.find().then(typeData => {
      const tempData = handleCountData(data, typeData)
      responseClient(res, 200, 200, '请求成功', tempData)
    })
  }).catch(err => {
    responseClient(res)
  })
})

router.post('/forYearCount1', function(req, res) { 
  const { startDate, endDate } = req.body
  // 按年份从数据库中取到数据
  BillDetail.find({ objDate: {$lte:endDate, $gte:startDate} }).then(data => {
    // 将数据库的数据经过处理分为12个坐标系
    let tempData = []
    for (let i = 1; i < 13; i++) {
      tempData.push(0)
      data.forEach((item) => {
        const tag = item.objDate.slice(5, 7)
        if (i === Number(tag)) {
          tempData[i - 1] += Number(item.objPrice)
        }
      })
    }
    responseClient(res, 200, 200, '请求成功', tempData)
  })
})

router.post('/forYearCount', function(req, res) {
  const { startDate, endDate } = req.body
  BillDetail.find({ objDate: {$lte:endDate, $gte:startDate} }).then(data => {
    BillType.find().then(typeData => {
      let tempData = {
        total: []
      }
      typeData.forEach((item) => {
        tempData[item.code] = []
      })
      for (let i = 1; i < 12; i++) {
        for (let j in tempData) {
          tempData[j].push(0)
        }
        data.forEach((items) => {
          const tag = items.objDate.slice(5, 7) // 取得数据的月份
          if (Number(tag) === i) {
            tempData[items.objType][i - 1] += Number(items.objPrice)
            tempData.total[i - 1] += Number(items.objPrice)
          }
        })
      }
      responseClient(res, 200, 200, '请求成功', tempData)
    })
  }).catch(err => {
    responseClient(res)
  })
})

module.exports = router