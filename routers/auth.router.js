const authRouter = require('express').Router()

const {
  signup,
  login
} = require('../controllers/auth.controller')
const { isEmailExist } = require('../middleware/validateInput')
// const validateInput = require('../middleware/validateInput')
const { validateDB } = require('../utils/validateData')

authRouter
  .post('/signup', isEmailExist, signup)
  .post('/login', [
    validateDB
  ], login)

module.exports = authRouter
