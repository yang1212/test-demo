import Express from 'express'
import { responseClient } from '../utils'
import BillType from '../../models/billTypeEnum'
const router = Express.Router()

router.post('/initTypeList', function (req, res) {
  const listData = [
    {
      code: 'life',
      label: 'label2'
    }
  ]
  const tempData = new BillType({
    listData
  })
  console.log(tempData)
  tempData.save().then(data => {
    responseClient(res, 200, 200, '请求成功', data)
  }).catch(err => {
    responseClient(res)
  })
})

module.exports = router