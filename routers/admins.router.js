const router = require('express').Router()
const { checkAdmin } = require('../utils/admin')

const {
  createAdmin,
  loginAdmin,
  signupUser,
  adminShowUsers,
  adminDeleteUser,
  adminUpdateUser,
  adminCreateCompany,
  adminShowCompanies,
  adminDeleteCompany,
  adminUpdateCompany,
  adminCreateCourse,
  adminShowCourses,
  adminDeleteCourse,
  adminUpdateCourse,
  adminSuscribeCourse,
  adminUnsuscribeCourse,
  adminCreateOffer,
  adminShowOffers,
  adminDeleteOffer,
  adminUpdateOffer,
  adminSuscribeOffer,
  adminUnsuscribeOffer
} = require('../controllers/admins.controller')

router.post('/', createAdmin)
router.post('/login', loginAdmin)

router.get('/users', checkAdmin, adminShowUsers)
router.post('/signup', checkAdmin, signupUser)
router.put('/users/:userId', checkAdmin, adminUpdateUser)
router.delete('/users/:userId', checkAdmin, adminDeleteUser)

router.get('/companies', checkAdmin, adminShowCompanies)
router.post('/companies', checkAdmin, adminCreateCompany)
router.put('/companies/:companyId', checkAdmin, adminUpdateCompany)
router.delete('/companies/:companyId', checkAdmin, adminDeleteCompany)

router.get('/courses', checkAdmin, adminShowCourses)
router.post('/courses/:companyId', checkAdmin, adminCreateCourse)
router.put('/courses/:courseId', checkAdmin, adminUpdateCourse)
router.delete('/courses/:courseId', checkAdmin, adminDeleteCourse)
router.put('/courses/:courseId/:userId/suscribe', checkAdmin, adminSuscribeCourse)
router.put('/courses/:courseId/:userId/unsuscribe', checkAdmin, adminUnsuscribeCourse)

router.get('/offers', checkAdmin, adminShowOffers)
router.post('/offers/:companyId', checkAdmin, adminCreateOffer)
router.put('/offers/:offerId', checkAdmin, adminUpdateOffer)
router.delete('/offers/:offerId', checkAdmin, adminDeleteOffer)
router.put('/offers/:offerId/userId', checkAdmin, adminSuscribeOffer)
router.put('/offers/:id/unsuscribe/userId', checkAdmin, adminUnsuscribeOffer)

module.exports = router
