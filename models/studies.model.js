const mongoose = require('mongoose')

const studiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  center: {
    type: String,
    required: 'Center is required'
  },
  year: {
    type: Number,
    required: 'Year is required'
  }

})

module.exports = studiesSchema
