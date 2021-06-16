const mongoose = require('mongoose')

const socialSchema = require('./socialMedia.model')

const companiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  description: {
    type: String
  },
  island: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  socialMedia: [socialSchema]

})

const CompaniesModel = mongoose.model('companie', companiesSchema)

module.exports = CompaniesModel
