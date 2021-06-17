const jwt = require('jsonwebtoken')
const userModel = require('../models/users.model')

exports.createJWT = (id, rol) => {
  return new Promise((resolve, reject) => {
    const payload = { id, rol }
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

/* exports.checkUser = (req, res, next) => {
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

*/

exports.checkUser = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) { return res.status(403).json({ Msg: 'Please Log-in or Sign-up' }) }

    req.token = token
    next()
  })
}
