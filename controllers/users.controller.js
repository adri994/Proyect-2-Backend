const bcrypt = require('bcrypt')
const userModel = require('../models/users.model')

exports.showUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ Msg: 'Error while show users' })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
    req.body.password = HASHED_PWD
    const userEdited = await userModel.findByIdAndUpdate(res.locals.result._id, req.body, { new: true })
    res.json(userEdited)
  } catch (error) {
    res.status(400).json({ Msg: 'Error while update user' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userDeleted = await userModel.findById(res.locals.result._id)
    bcrypt.compare(req.body.password, userDeleted.password, (err, result) => {
      if (err) throw new Error(err)
      if (!result) {
        return res.json({ error: 'Wrong email or password' })
      } else {
        res.json(userDeleted)
        userDeleted.remove()
      }
    })
  } catch (error) {
    res.status(400).json({ Msg: 'Error deleting user' })
  }
}
