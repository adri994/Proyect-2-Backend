const router = require('express').Router()
const { validateInput, isCompany } = require('../middleware/validateInput')
const { check } = require('express-validator')
const { checkUser } = require('../utils/jwt')

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
  checkUser,
  isCompany,
  validateInput
], createCourse)

router.put('/:id_course', [
  checkUser,
  isCompany,
  validateInput
], updateCourse)

router.delete('/:id_course', [
  checkUser,
  isCompany,
  validateInput], deleteCourse)

module.exports = router
