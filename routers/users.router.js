const router = require('express').Router()
const { checkUser } = require('../utils/jwt')

const {
  showUsers,
  updateUser,
  deleteUser
} = require('../controllers/users.controller')

router.get('/', checkUser, showUsers)
router.put('/', checkUser, updateUser)
router.delete('/', checkUser, deleteUser)

module.exports = router
