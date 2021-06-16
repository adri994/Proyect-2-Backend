const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
  min: {
    type: String,
    default: 'no definido'
  },
  max: {
    type: String,
    default: 'no definido'
  }
})

module.exports = salarySchema
