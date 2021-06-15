const courseModel = require('../models/courses.model')

exports.createCourse = async (req, res) => {
  try {
    const arrArea = []
    req.body.area.forEach(element => {
      arrArea.push(element.toLowerCase())
    })
    req.body.area = arrArea
    const newCourse = await courseModel.create(req.body)
    res.json(newCourse)
  } catch (error) {
    res.status(500).json({ msg: 'Error' })
  }
}

exports.showCourses = async (req, res) => {
  try {
    const courses = await courseModel.find(req.query)
    console.log(courses)
    res.status(200).json(courses)
  } catch (error) {
    res.status(400).json({ Msg: 'Error' })
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
    res.status(400).json({ Msg: 'Error' })
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
    res.status(400).json({ Msg: 'Error' })
  }
}
