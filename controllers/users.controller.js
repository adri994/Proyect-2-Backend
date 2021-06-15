const bcrypt = require('bcrypt')
const userModel = require('../models/users.model')

exports.showUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ Msg: 'Error' })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
    req.body.password = HASHED_PWD
    const userEdited = await userModel.findByIdAndUpdate(res.locals.result._id, req.body, { new: true })
    userEdited.save()
    res.json(userEdited)
  } catch (error) {
    res.status(400).json({ Msg: 'Error' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userDeleted = await userModel.findById(res.locals.result._id)
    res.json(userDeleted)
    userDeleted.remove()
  } catch (error) {
    res.status(400).json({ Msg: 'Error' })
  }
}
