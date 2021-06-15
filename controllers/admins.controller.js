const adminModel = require('../models/admins.model')
const bcrypt = require('bcrypt')
const { createJWT } = require('../utils/jwt')

exports.createAdmin = async (req, res) => {
  try {
    if (req.body.pass_admin === process.env.ADMIN_PASSWORD) {
      const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
      const HASHED_PWD2 = bcrypt.hashSync(req.body.password, 10)
      req.body.password = HASHED_PWD
      req.body.pass_admin = HASHED_PWD2
      req.body.admin = true
      console.log(req.body)
      const newAdmin = await adminModel.create(req.body)
      res.json(newAdmin)
    } else {
      res.json({ Msg: 'Error: Your verify admin password is wrong' })
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error' })
  }
}

exports.loginAdmin = async (req, res) => {
  adminModel
    .findOne({ username: req.body.username })
    .then(data => {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, result) => {
          if (err) throw new Error(err)
          if (!result) {
            return res.json({ error: 'Wrong username or password' })
          } else {
            createJWT(data._id).then(token => {
              const USER_DATA = { username: data.username }
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
