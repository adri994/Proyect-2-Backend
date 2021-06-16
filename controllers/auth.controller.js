const userModel = require('../models/users.model')
const CompaniesModel = require('../models/companies.model')
const bcrypt = require('bcrypt')
const { createJWT } = require('../utils/jwt')

const login = async (req, res) => {
  const { email, password, _id } = req.user

  const isUser = await bcrypt.compare(req.body.password, password)
  if (isUser) {
    const token = await createJWT(_id)
    res.json({ token, email })
  }
}
const signup = async (req, res) => {
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
      res.status(400).json({ Msg: 'Error showing User' })
    }
  } else {
    try {
      CompaniesModel.create(user).then(newUser => {
        newUser.save()
        createJWT(newUser._id)
          .then(token => {
            res.json({ token, name: newUser.name, email: newUser.email, password: newUser.password })
          })
          .catch(err => console.log(err))
      })
    } catch (error) {
      res.status(400).json({ Msg: 'Error showing Company' })
    }
  }
}

module.exports = {
  login, signup
}
