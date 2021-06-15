const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Admin account name is required',
    trim: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  pass_admin: {
    type: String,
    required: 'Admin password is required'
  },
  admin: {
    type: Boolean
  }
})

const adminModel = mongoose.model('admins', adminSchema)

module.exports = adminModel
