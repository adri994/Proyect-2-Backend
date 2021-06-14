const router = require('express').Router()
const { createUser } = require('../controllers/users.controller')

router.post('/', createUser)

module.exports = router
