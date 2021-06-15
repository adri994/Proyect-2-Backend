const router = require('express').Router()
const { checkAdmin } = require('../utils/admin')

const {
  createAdmin,
  loginAdmin
} = require('../controllers/admins.controller')

const {
  showUsers,
  updateUser,
  deleteUser
} = require('../controllers/users.controller')

const {
  showCourses,
  createCourse,
  registerUser,
  unsuscribeUser
} = require('../controllers/courses.controller')

router.post('/', createAdmin)
router.post('/login', loginAdmin)

router.get('/users', checkAdmin, showUsers)
router.put('/users', checkAdmin, updateUser)
router.delete('/users', checkAdmin, deleteUser)

router.get('/courses', checkAdmin, showCourses)
router.post('/courses', checkAdmin, createCourse)
router.put('/courses/:id', checkAdmin, registerUser)
router.put('/courses/:id/unsuscribe', checkAdmin, unsuscribeUser)

module.exports = router
