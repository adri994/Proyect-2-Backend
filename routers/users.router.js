const router = require('express').Router()
const { checkAuth } = require('../utils/jwt')

const {
  showUsers,
  updateUser,
  deleteUser
} = require('../controllers/users.controller')

router.get('/', checkAuth, showUsers)
router.put('/:id', checkAuth, updateUser)
router.delete('/:id', checkAuth, deleteUser)

module.exports = router
