const router = require('express').Router()

const userRouter = require('./users.router')
const courseRouter = require('./courses.router')
const adminRouter = require('./admins.router')
const { authRouter } = require('./auth.router')
const companyRouter = require('./companies.router')

router.use('/users', userRouter)
router.use('/courses', courseRouter)
router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/company', companyRouter)

module.exports = router
