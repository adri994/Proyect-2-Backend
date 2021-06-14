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
    const userEdited = await userModel.findByIdAndUpdate(req.params.id, req.body)
    userEdited.save()
    res.json(userEdited)
  } catch (error) {
    res.status(400).json({ Msg: 'Error' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userDeleted = await userModel.findById(req.params.id)
    res.json(userDeleted)
    userDeleted.remove()
  } catch (error) {
    res.status(400).json({ Msg: 'Error' })
  }
}
