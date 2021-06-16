const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
  min: {
    type: String,
    default: 'Not defined'
  },
  max: {
    type: String,
    default: 'Not defined'
  }
})

module.exports = salarySchema
