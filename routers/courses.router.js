const router = require('express').Router()
const { validateInput } = require('../middleware/validateInput')
const { check } = require('express-validator')
const { checkUser } = require('../utils/jwt')
const { isCompany } = require('../middleware/validateInput')

const {
  suscribeCourseUser,
  unsuscribeCourseUser
} = require('../controllers/courses.controller')

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses
} = require('../controllers/companies.controller')

router.get('/', checkUser, getAllCourses)
router.post('/', [
  check('title', 'Tittle must not be empty').not().isEmpty(),
  check('description', 'Description must not be empty').not().isEmpty(),
  check('duration', 'Duration is required').not().isEmpty(),
  check('price', 'Price must be any number').not().isEmpty(),
  validateInput
], createCourse)
router.put('/:courseId/suscribe', checkUser, suscribeCourseUser)
router.put('/:courseId/unsuscribe', checkUser, unsuscribeCourseUser)
router.put('/:courseId', isCompany, updateCourse)
router.delete('/:courseId', isCompany, deleteCourse)

module.exports = router
