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

const { checkUser } = require('../utils/jwt')

router.get('/', checkUser, getAllOffers)
router.post('/', createOffer)
router.put('/:offerId', updateOffer)
router.delete('/:offerId', deleteOffer)
router.put('/:offerId/inscribe', checkUser, inscribeOfferUser)
router.put('/:offerId/unsuscribe', checkUser, unsuscribeOfferUser)

module.exports = router
