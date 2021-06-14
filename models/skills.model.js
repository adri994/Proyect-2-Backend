const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  name: String,
  skill: Array
})

module.exports = skillSchema
