const { createJWT } = require('../utils/jwt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const courseModel = require('../models/courses.model')
const companyModel = require('../models/companies.model')
const jobModel = require('../models/jobs.model')

const addCompany = async (req, res) => {
  try {
    const user = req.body
    const newCompany = await companyModel.create(user)
    const token = await createJWT(user._id)
    res.json({ newCompany, token })
  } catch (error) {
    res.status(400).json({ msg: 'Error while add company' })
  }
}

const editCompany = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  try {
    const user = req.body
    const companyEdited = await companyModel.findByIdAndUpdate(id, user)
    res.json(companyEdited)
  } catch (error) {
    res.status(400).json({ msg: 'Error while edit company' })
  }
}

const deleteCompany = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  try {
    const companyDel = await companyModel.findByIdAndDelete(id)
    res.json(companyDel)
  } catch (error) {
    res.status(400).json({ msg: 'Error while delete company' })
  }
}

const createCourse = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id, rol } = verify
  req.body.id_company = mongoose.Types.ObjectId(id)

  const [course, company] = await Promise.all([
    courseModel.create(req.body),
    companyModel.findById(id)
  ])
  // company.courses.push(course._id)
  // company.save()
  res.json({ course, company })
}

const updateCourse = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_course }
  const courseEdited = await courseModel.findOneAndUpdate(query, req.body, { new: true })
  res.json(courseEdited)
}

const deleteCourse = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_course }
  const courseDel = await courseModel.findOneAndDelete(query)
  res.json(courseDel)
}

const getAllCourses = async (req, res) => {
  let showCourses
  const { id, rol } = req.token
  const query = { id_company: id }
  if (rol === 'user') showCourses = await courseModel.find()
  else showCourses = await courseModel.find(query)

  res.json(showCourses)
}

// Offer

const createOffer = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id, rol } = verify
  if (rol === 'user') return res.status(400).json({ msg: 'Error while add offer' })
  req.body.id_company = mongoose.Types.ObjectId(id)
  const jobAdd = await jobModel.create(req.body)
  res.json(jobAdd)
}

const getAllOffers = async (req, res) => {
  let showOffers
  const { id, rol } = req.token
  const query = { id_company: id }
  if (rol === 'user') showOffers = await jobModel.find()
  else showOffers = await jobModel.find(query)

  res.json(showOffers)
}

const deleteOffer = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_offer }
  const oferDel = await jobModel.findOneAndDelete(query)

  res.json(oferDel)
}

const updateOffer = async (req, res) => {
  const verify = jwt.verify(req.headers.token, process.env.SECRET)
  const { id } = verify
  const query = { id_company: id, _id: req.params.id_offer }
  const jobEdited = await jobModel.findOneAndUpdate(query, req.body, { new: true })
  res.json(jobEdited)
}

module.exports = {
  addCompany,
  editCompany,
  deleteCompany,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  createOffer,
  deleteOffer,
  updateOffer,
  getAllOffers
}
