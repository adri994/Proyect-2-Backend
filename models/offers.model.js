const mongoose = require('mongoose')
const salarySchema = require('./salary.model')

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  id_company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies'
  },
  salary: salarySchema,
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }]

})

const jobModel = mongoose.model('jobOffer', jobSchema)

module.exports = jobModel
