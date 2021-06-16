const courseModel = require('../models/courses.model')

exports.createCourse = async (req, res) => {
  try {
    const arrArea = []
    req.body.area.forEach(element => {
      arrArea.push(element.toLowerCase())
    })
    req.body.area = arrArea
    const courseNew = await courseModel.create(req.body)
    res.json(courseNew)
  } catch (error) {
    res.status(500).json({ Msg: 'Error creating course' })
  }
}

exports.showCourses = async (req, res) => {
  try {
    const courses = await courseModel.find(req.query)
    res.status(200).json(courses)
  } catch (error) {
    res.status(400).json({ Msg: 'Error can not show courses' })
  }
}

exports.registerUser = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id)
    if (!course.registered.includes(res.locals.result._id)) {
      course.registered.push(res.locals.result._id)
      course.save()
      res.json(course)
    } else {
      res.status(409).json({ Msg: 'User already registered' })
    }
  } catch (error) {
    res.status(400).json({ Msg: 'Error while register user' })
  }
}

exports.unsuscribeUser = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id)
    const user = course.registered.indexOf(res.locals.result._id)
    if (user !== -1) {
      course.registered.splice(user, 1)
      course.save()
      res.json(course)
    } else {
      res.status(409).json({ Msg: 'You are not register in this course' })
    }
  } catch (error) {
    res.status(400).json({ Msg: 'Unsuscribe user is NOT possible' })
  }
}
