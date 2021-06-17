const { createJWT } = require('../utils/jwt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const courseModel = require('../models/courses.model')
const companyModel = require('../models/companies.model')
const jobModel = require('../models/offers.model')

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
  const { id } = req.token
  try {
    const [companyRemove] = await Promise.all([
      companyModel.findByIdAndDelete(id),
      courseModel.deleteMany({ id_company: id }),
      jobModel.deleteMany({ id_company: id })

    ])
    // const companyDel = await companyModel.findByIdAndDelete(id)
    res.json(companyRemove)
  } catch (error) {
    res.status(400).json({ msg: 'Error while delete company' })
  }
}

const createCourse = async (req, res) => {
  const { id } = req.token
  req.body.id_company = mongoose.Types.ObjectId(id)
  try {
    const course = await courseModel.create(req.body)
    res.json(course)
  } catch (error) {
    console.log({ msg: 'Error while create course' })
  }
}

const updateCourse = async (req, res) => {
  const { id } = req.token
  const query = { id_company: id, _id: req.params.courseId }
  try {
    const courseEdited = await courseModel.findOneAndUpdate(query, req.body, { new: true })
    res.json(courseEdited)
  } catch (error) {
    res.json({ msg: 'Error while update course' })
  }
}

const deleteCourse = async (req, res) => {
  const { id } = req.token
  const query = { id_company: id, _id: req.params.courseId }
  try {
    const courseDel = await courseModel.findOneAndDelete(query)
    res.json(courseDel)
  } catch (error) {
    res.json({ msg: 'Error while delete course' })
  }
}

const getAllCourses = async (req, res) => {
  let showCourses
  const { id, rol } = req.token
  const query = { id_company: id }
  try {
    if (rol === 'user') showCourses = await courseModel.find()
    else showCourses = await courseModel.find(query)
    res.json(showCourses)
  } catch (error) {
    res.json({ msg: 'Error while get course' })
  }
}

// Offer

const createOffer = async (req, res) => {
  console.log(req.token)
  const { id } = req.token
  req.body.id_company = mongoose.Types.ObjectId(id)
  try {
    const jobAdd = await jobModel.create(req.body)
    res.json(jobAdd)
  } catch (error) {
    res.json({ msg: 'Error while create offer' })
  }
}

const getAllOffers = async (req, res) => {
  let showOffers
  const { id, rol } = req.token
  const query = { id_company: id }
  try {
    if (rol === 'user') showOffers = await jobModel.find()
    else showOffers = await jobModel.find(query)
    res.json(showOffers)
  } catch (error) {
    res.json({ msg: 'Error while show offers' })
  }
}

const deleteOffer = async (req, res) => {
  const { id } = req.token
  const query = { id_company: id, _id: req.params.offerId }
  try {
    const oferDel = await jobModel.findOneAndDelete(query)
    res.json(oferDel)
  } catch (error) {
    res.json({ msg: 'Error while edit offer' })
  }
}

const updateOffer = async (req, res) => {
  const { id } = req.token
  const query = { id_company: id, _id: req.params.offerId }
  try {
    const jobEdited = await jobModel.findOneAndUpdate(query, req.body, { new: true })
    res.json(jobEdited)
  } catch (error) {
    res.json({ msg: 'Error while edit offer' })
  }
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
