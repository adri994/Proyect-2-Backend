const router = require('express').Router()

const userRouter = require('./users.router')
const companyRouter = require('./companies.router')
const { authRouter } = require('./auth.router')

router.use('/users', userRouter)
router.use('/company', companyRouter)
router.use('/auth', authRouter)

module.exports = router
