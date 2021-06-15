const jwt = require('jsonwebtoken')
const adminModel = require('../models/admins.model')

exports.checkAdmin = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) { res.status(403).json({ error: 'Please Log-in or Sign-up' }) }
    adminModel
      .findOne({ _id: token.id })
      .then(result => {
        if (result && result.admin) {
          res.locals.result = result
          next()
        } else {
          res.json({ Msg: 'What\'s wrong with you? You\'re not ADMIN!! ¬¬' })
        }
      })
  })
}
