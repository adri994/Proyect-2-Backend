const router = require('express').Router()

const { createOffer, getAllOffers, updateOffer, deleteOffer } = require('../controllers/companies.controller')

const { checkUser } = require('../utils/jwt')

router.get('/', checkUser, getAllOffers)
router.post('/', createOffer)
router.put('/:id_offer', updateOffer)
router.delete('/:id_offer', deleteOffer)

module.exports = router
