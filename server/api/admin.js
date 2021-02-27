import express from 'express'
const router = express.Router()

router.use('/calculate', require('./blogManager'))
router.use('/imgData', require('./imageManager'))

module.exports = router