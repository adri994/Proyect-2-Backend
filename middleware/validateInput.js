const { validationResult } = require('express-validator')

const userModel = require('../models/users.model')
const companyModel = require('../models/companies.model')

const validateInput = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

const isCompany = (req, res, next) => {
  const { rol } = req.token
  if (rol === 'user') return res.status(400).json({ msg: 'You are not a company' })
  next()
}

const isEmailExist = async (req, res, next) => {
  const { rol = 'user', email } = req.body
  let existEmail
  console.log({ email })
  if (rol === 'user') existEmail = await userModel.find({ email: email })
  else existEmail = await companyModel.findOne({ email: email })

  if (existEmail) return res.status(400).json({ msg: 'Email Exist' })

  next()
}

module.exports = { validateInput, isCompany, isEmailExist }
