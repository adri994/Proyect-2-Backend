const router = require('express').Router()

const {
  deleteCompany,
  editCompany,
  getCompanies
} =
  require('../controllers/companies.controller')
const { isCompany, validateInput } = require('../middleware/validateInput')
const { checkUser } = require('../utils/jwt')

// Company

router.get('/', checkUser, getCompanies)

router.put('/', [
  checkUser,
  isCompany,
  validateInput
], editCompany)
router.delete('/', [
  checkUser,
  isCompany,
  validateInput
], deleteCompany)

module.exports = router
