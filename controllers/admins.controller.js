const adminModel = require('../models/admins.model')
const userModel = require('../models/users.model')
const courseModel = require('../models/courses.model')
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
      const newAdmin = await adminModel.create(req.body)
      res.json(newAdmin)
    } else {
      res.json({ Error: 'Your admin password is wrong' })
    }
  } catch (error) {
    res.status(500).json({ Msg: 'Error admin account is NOT created' })
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
            return res.json({ Msg: 'Wrong username or password' })
          } else {
            createJWT(data._id).then(token => {
              const USER_DATA = { username: data.username }
              return res.json({ token, ...USER_DATA })
            })
              .catch(err => {
                console.log(err)
                res.status(500).json({ Msg: 'Error' })
              })
          }
        })
      } else res.status(500).json({ Msg: 'Wrong email or password' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ Msg: 'Error while login' })
    })
}

exports.signupUser = (req, res) => {
  const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
  req.body.password = HASHED_PWD
  userModel.create(req.body).then(newUser => {
    newUser.save()
    res.json({ name: newUser.name, email: newUser.email })
      .catch(err => {
        console.log(err)
        res.status(500).json({ Msg: 'Error' })
      })
  })
}

exports.adminDeleteUser = async (req, res) => {
  try {
    const userDeleted = await userModel.findOne({ email: req.body.email })
    res.json(userDeleted)
    userDeleted.remove()
  } catch (error) {
    res.status(400).json({ Msg: 'Error email not found' })
  }
}

exports.adminUpdateUser = async (req, res) => {
  try {
    const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
    req.body.password = HASHED_PWD
    const userEdited = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(userEdited)
  } catch (error) {
    res.status(400).json({ Msg: 'Error user not found' })
  }
}

exports.adminDeleteCourse = async (req, res) => {
  try {
    const deleteCourse = await courseModel.findByIdAndDelete(req.params.id)
    res.json(deleteCourse)
  } catch (error) {
    res.status(400).json({ Msg: 'Course user not found' })
  }
}
