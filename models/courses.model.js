const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  area: {
    type: Array,
    lowercase: true
  },
  duration: {
    type: String
  },
  certificate: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  registered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }]

})

const courseModel = mongoose.model('courses', courseSchema)

module.exports = courseModel
