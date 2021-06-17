const router = require('express').Router()

const {
  createOffer,
  getAllOffers,
  updateOffer,
  deleteOffer
} = require('../controllers/companies.controller')

const {
  inscribeOfferUser,
  unsuscribeOfferUser
} = require('../controllers/offers.controller')
const { check } = require('express-validator')
const { isCompany, validateInput } = require('../middleware/validateInput')

const { checkUser } = require('../utils/jwt')

router.get('/', checkUser, getAllOffers)

router.put('/:offerId', [
  checkUser,
  isCompany,
  validateInput
], updateOffer)
router.put('/:offerId/inscribe', checkUser, inscribeOfferUser)
router.put('/:offerId/unsuscribe', checkUser, unsuscribeOfferUser)

router.post('/', [
  check('title', 'Tittle must not be empty').not().isEmpty(),
  check('description', 'Description must not be empty').not().isEmpty(),
  check('position', 'Description must not be empty').not().isEmpty(),
  checkUser,
  isCompany,
  validateInput
], createOffer)

router.delete('/:offerId', [
  checkUser,
  isCompany,
  validateInput
], deleteOffer)

module.exports = router
