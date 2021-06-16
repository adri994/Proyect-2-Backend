const router = require('express').Router()
const { check } = require('express-validator')

const { deleteCompany, editCompany, addCourse, editCourse, deleteCourse, getAllCourses, addJob, getAllOffer, editJob, deleteJob } = require('../controllers/companies.controller')

const validateInput = require('../middleware/validateInput')

// Job
router.get('/offers', getAllOffer)
router.post('/addJob', addJob)
router.put('/offers/:id_offer', editJob)
router.delete('/offers/:id_offer', deleteJob)

// Courses
router.get('/courses', getAllCourses)
router.post('/addCourse', [
  check('title', 'no debe estar vacio').not().isEmpty(),
  check('description', 'no debe estar vacio').not().isEmpty(),
  check('duration', 'Es obligatorio').not().isEmpty(),
  check('price', 'Debe tener un numero').not().isEmpty(),
  validateInput
], addCourse)
router.put('/:id_course', editCourse)
router.delete('/:id_course', deleteCourse)

// Company
router.put('/', editCompany)
router.delete('/', deleteCompany)

module.exports = router
