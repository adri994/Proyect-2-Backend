const mongoose = require('mongoose')

const studiesSchema = require('./studies.model')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  lastName: {
    type: String,
    required: 'lastname is required'
  },
  email: {
    type: String,
    required: 'E-mail is required',
    trim: true,
    lowercase: true,
    unique: 'E-mail already exist'
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  birthDate: {
    type: String,
    required: 'Date is required'
  },
  city: {
    type: String,
    required: 'City is required'
  },
  description: {
    type: String
  },
  socialMedia: [],
  experience: [],
  studies: [studiesSchema]
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
