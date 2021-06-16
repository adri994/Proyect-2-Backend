const userModel = require('../models/users.model')
const companyModel = require('../models/companies.model')
const bcrypt = require('bcrypt')
const { createJWT } = require('../utils/jwt')

exports.signup = (req, res) => {
  const { rol = 'user', ...user } = req.body
  const HASHED_PWD = bcrypt.hashSync(user.password, 10)
  user.password = HASHED_PWD
  if (rol === 'user') {
    try {
      userModel.create(user).then(newUser => {
        newUser.save()
        createJWT(newUser._id)
          .then(token => {
            res.json({ token, name: newUser.name, email: newUser.email, password: newUser.password, rol })
          })
          .catch(err => console.log(err))
      })
    } catch (error) {
      res.status(400).json({ Msg: 'Error signup user' })
    }
  } else {
    try {
      companyModel.create(user).then(newUser => {
        newUser.save()
        createJWT(newUser._id)
          .then(token => {
            res.json({ token, name: newUser.name, email: newUser.email, password: newUser.password })
          })
          .catch(err => console.log(err))
      })
    } catch (error) {
      res.status(400).json({ Msg: 'Error signup company' })
    }
  }
}

exports.login = async (req, res) => {
  const { rol = 'user' } = req.body
  const { email, password, _id } = req.user
  const isUser = await bcrypt.compare(req.body.password, password)
  if (isUser) {
    const token = await createJWT(_id, rol)
    res.json({ token, email })
  } else {
    res.json({ Msg: 'Wrong username or password' })
  }
}
