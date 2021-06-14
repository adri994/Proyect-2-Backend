const jwt = require('jsonwebtoken')
const userModel = require('../models/users.model')
// const { CompanyModel } = require('../api/models/companies.model')

exports.createJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id }
    jwt.sign(payload, process.env.SECRET, {
      expiresIn: '1h'
    }, (err, token) => {
      if (!err) {
        resolve(token)
      } else {
        reject(err)
      }
    })
  })
}

exports.checkAuth = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) { res.status(403).json({ error: 'Please Log-in or Sign-up' }) }
    userModel
      .findOne({ _id: token.id })
      .then(result => {
        if (result) {
          res.locals.result = result
          next()
        } else {
          res.json({ err: 'Token not valid' })
        }
      })
  })
}
