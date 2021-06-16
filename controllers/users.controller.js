const userModel = require('../models/users.model')

const createUser = async (req, res) => {
  console.log('adrian')
  try {
    const user = req.body
    const newUser = await userModel.create(user)
    newUser.save()
    res.json(newUser)
  } catch (error) {
    res.status(400).json({ msg: 'Error' })
  }
}

module.exports = {
  createUser
}
