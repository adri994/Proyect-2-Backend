const router = require('express').Router()

const { check } = require('express-validator')
const { createOffer, getAllOffers, updateOffer, deleteOffer } = require('../controllers/companies.controller')
const { isCompany, validateInput } = require('../middleware/validateInput')

const { checkUser } = require('../utils/jwt')

router.get('/', checkUser, getAllOffers)
router.post('/', [
  check('title', 'Tittle must not be empty').not().isEmpty(),
  check('description', 'Description must not be empty').not().isEmpty(),
  check('position', 'Description must not be empty').not().isEmpty(),
  checkUser,
  isCompany,
  validateInput
], createOffer)
router.put('/:id_offer', [
  checkUser,
  isCompany,
  validateInput
], updateOffer)
router.delete('/:id_offer', [
  checkUser,
  isCompany,
  validateInput
], deleteOffer)

module.exports = router
