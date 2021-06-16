const router = require('express').Router()
const { checkAdmin } = require('../utils/admin')

const {
  createAdmin,
  loginAdmin,
  adminDeleteUser,
  signupUser,
  adminUpdateUser,
  adminDeleteCourse
} = require('../controllers/admins.controller')

const {
  showUsers
} = require('../controllers/users.controller')

const {
  showCourses,
  createCourse,
  registerUser,
  unsuscribeUser
} = require('../controllers/courses.controller')

router.post('/signup', checkAdmin, signupUser)

router.post('/', createAdmin)
router.post('/login', loginAdmin)

router.get('/users', checkAdmin, showUsers)
router.put('/users/:id', checkAdmin, adminUpdateUser)
router.delete('/users', checkAdmin, adminDeleteUser)

router.get('/courses', checkAdmin, showCourses)
router.post('/courses', checkAdmin, createCourse)
router.put('/courses/:id', checkAdmin, registerUser)
router.put('/courses/:id/unsuscribe', checkAdmin, unsuscribeUser)
router.delete('/courses/:id', checkAdmin, adminDeleteCourse)

module.exports = router
