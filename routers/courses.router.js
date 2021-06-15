const router = require('express').Router()
const { checkAuth } = require('../utils/jwt')

const {
  showCourses,
  createCourse,
  showCoursesByArea,
  registerUser,
  unsuscribeUser
} = require('../controllers/courses.controller')

router.get('/', checkAuth, showCourses)
router.get('/:area', checkAuth, showCoursesByArea)
router.post('/', createCourse)
router.put('/:id', checkAuth, registerUser)
router.put('/:id/unsuscribe', checkAuth, unsuscribeUser)

module.exports = router
