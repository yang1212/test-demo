import express from 'express'
const router = express.Router()

router.use('/calculate', require('./blogManager'))
router.use('/imgData', require('./imageManager'))
router.use('/billType', require('./billManager'))

module.exports = router