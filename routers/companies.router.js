const router = require('express').Router()

const {
  deleteCompany,
  editCompany
} =
  require('../controllers/companies.controller')

// Company

router.put('/', editCompany)
router.delete('/', deleteCompany)

module.exports = router
