const authRouter = require('express').Router()

const {
  signup,
  login
} = require('../controllers/auth.controller')
// const validateInput = require('../middleware/validateInput')
const { validateDB } = require('../utils/validateData')

authRouter
  .post('/signup', signup)
  .post('/login', [
    validateDB
  ], login)

module.exports = authRouter
