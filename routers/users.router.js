const router = require('express').Router()
const { checkAuth } = require('../utils/jwt')

const {
  showUsers,
  updateUser,
  deleteUser
} = require('../controllers/users.controller')

router.get('/', checkAuth, showUsers)
router.put('/', checkAuth, updateUser)
router.delete('/', checkAuth, deleteUser)

module.exports = router
