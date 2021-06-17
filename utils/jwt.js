const jwt = require('jsonwebtoken')

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

exports.checkUser = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) { return res.status(403).json({ Msg: 'Please Log-in or Sign-up' }) }

    req.token = token
    next()
  })
}
