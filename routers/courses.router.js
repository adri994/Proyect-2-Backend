const router = require('express').Router()
const { checkAuth } = require('../utils/jwt')

const {
  showCourses,
  registerUser,
  unsuscribeUser
} = require('../controllers/courses.controller')

router.get('/', checkAuth, showCourses)
router.put('/:id', checkAuth, registerUser)
router.put('/:id/unsuscribe', checkAuth, unsuscribeUser)

module.exports = router
