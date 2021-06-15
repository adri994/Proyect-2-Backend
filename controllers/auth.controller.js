const userModel = require('../models/users.model')
// const { CompanyModel } = require('../models/companies.model')
const bcrypt = require('bcrypt')
const { createJWT } = require('../utils/jwt')

exports.signup = async (req, res) => {
  try {
    const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
    req.body.password = HASHED_PWD
    userModel.create(req.body).then(newUser => {
      newUser.save()
      createJWT(newUser._id)
        .then(token => {
          res.json({ token, name: newUser.name, email: newUser.email, password: newUser.password })
        })
        .catch(err => console.log(err))
    })
  } catch (error) {
    res.status(400).json({ Msg: 'Error showing User' })
  }
}

exports.login = async (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then(data => {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, result) => {
          if (err) throw new Error(err)
          if (!result) {
            return res.json({ error: 'Wrong email or password' })
          } else {
            createJWT(data._id).then(token => {
              const USER_DATA = { name: data.name, email: data.email }
              return res.json({ token, ...USER_DATA })
            })
              .catch(err => {
                console.log(err)
                res.status(500).json({ msg: 'Error' })
              })
          }
        })
      } else res.status(500).json({ msg: 'Wrong email or password' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}
