const router = require('express').Router()
const { check } = require('express-validator')

const { deleteCompany, editCompany, addCourse, editCourse, deleteCourse, getAllCourses, addJob, getAllOffer, editJob, deleteJob } = require('../controllers/companies.controller')

const validateInput = require('../middleware/validateInput')

// Job
router.get('/offers', getAllOffer)
router.post('/offer', addJob)
router.put('/offers/:id_offer', editJob)
router.delete('/offers/:id_offer', deleteJob)

// Courses
router.get('/courses', getAllCourses)
router.post('/course', [
  check('title', 'Tittle must not be empty').not().isEmpty(),
  check('description', 'Description must not be empty').not().isEmpty(),
  check('duration', 'Duration is required').not().isEmpty(),
  check('price', 'Price must be any number').not().isEmpty(),
  validateInput
], addCourse)
router.put('/courses/:id_course', editCourse)
router.delete('/courses/:id_course', deleteCourse)

// Company
router.put('/', editCompany)
router.delete('/', deleteCompany)

module.exports = router
