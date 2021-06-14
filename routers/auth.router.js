const authRouter = require('express').Router()

const {
  signup,
  login
} = require('../controllers/auth.controller')

authRouter
  .post('/signup', signup)
  .post('/login', login)

exports.authRouter = authRouter
