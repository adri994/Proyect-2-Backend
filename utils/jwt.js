const jwt = require('jsonwebtoken')

const createJWT = (id) => {
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


module.exports = {
  createJWT
}
