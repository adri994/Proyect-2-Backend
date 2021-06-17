const router = require('express').Router()

const {
  deleteCompany,
  editCompany
} =
  require('../controllers/companies.controller')
const { isCompany, validateInput } = require('../middleware/validateInput')
const { checkUser } = require('../utils/jwt')

// Company

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
