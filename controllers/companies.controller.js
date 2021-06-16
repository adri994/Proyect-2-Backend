const { createJWT } = require('../utils/jwt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const courseModel = require('../models/courses.model')
const companyModel = require('../models/companies.model')
const jobModel = require('../models/jobs.model')

const addCompany = async (req, res) => {
  try {
    const user = req.body
    const newUser = await companyModel.create(user)
    const token = await createJWT(user._id)
    res.json({ newUser, token })
  } catch (error) {
    res.status(400).json({ msg: 'Error while add company' })
  }
}

const editCompany = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  try {
    const user = req.body
    const newUser = await companyModel.findByIdAndUpdate(id, user)
    res.json(newUser)
  } catch (error) {
    res.status(400).json({ msg: 'Error while edit company' })
  }
}

const deleteCompany = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  try {
    const newUser = await companyModel.findByIdAndDelete(id)
    res.json(newUser)
  } catch (error) {
    res.status(400).json({ msg: 'Error while delete company' })
  }
}

const addCourse = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  req.body.id_company = mongoose.Types.ObjectId(id)

  const [course, company] = await Promise.all([
    courseModel.create(req.body),
    companyModel.findById(id)
  ])
  // company.courses.push(course._id)
  // company.save()
  res.json({ course, company })
}

const editCourse = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_course }
  const editCourse = await courseModel.findOneAndUpdate(query, req.body, { new: true })
  res.json(editCourse)
}

const deleteCourse = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_course }
  const deleteCompany = await courseModel.findOneAndDelete(query)
  res.json(deleteCompany)
}

const getAllCourses = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id }
  const showCourse = await courseModel.find(query)
  res.json(showCourse)
}

// Offer

const addJob = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  req.body.id_company = mongoose.Types.ObjectId(id)
  const add = await jobModel.create(req.body)
  res.json(add)
}

const getAllOffer = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id }
  const showCourse = await jobModel.find(query)
  res.json(showCourse)
}

const deleteJob = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_offer }
  const deleteOffer = await jobModel.findOneAndDelete(query)

  res.json(deleteOffer)
}

const editJob = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_offer }
  const editCourse = await jobModel.findOneAndUpdate(query, req.body, { new: true })
  res.json(editCourse)
}

module.exports = {
  addCompany,
  editCompany,
  deleteCompany,
  addCourse,
  editCourse,
  deleteCourse,
  getAllCourses,
  addJob,
  getAllOffer,
  deleteJob,
  editJob
}
