const { validationResult } = require('express-validator')

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

module.exports = {
  validateInput,
  isCompany
}
