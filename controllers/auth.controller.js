const userModel = require('../models/users.model')
// const { CompanyModel } = require('../models/companies.model')
const bcrypt = require('bcrypt')
const { createJWT } = require('../utils/jwt')

exports.signup = async (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(409).json({ err: 'E-mail already exist. Try other' })
      } else {
        try {
          const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
          req.body.password = HASHED_PWD
          const newUser = userModel.create(req.body)
          newUser.save()
          createJWT(newUser._id)
            .then(token => {
              res.json({ token, name: newUser.name, email: newUser.email, password: newUser.password })
            })
            .catch(err => console.log(err))
        } catch (error) {
          res.status(400).json({ Msg: 'Error' })
        }
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.login = async (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then(data => {
      if (data) {
        console.log(data)
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
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}
