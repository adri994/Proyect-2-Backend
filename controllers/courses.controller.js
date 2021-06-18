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

exports.suscribeCourseUser = async (req, res) => {
  try {
    const { id, rol } = req.token
    if (rol === 'user') {
      const course = await courseModel.findById(req.params.courseId)
      if (!course.registered.includes(id)) {
        course.registered.push(id)
        course.save()
        res.json(course)
      } else {
        res.status(409).json({ Msg: 'User already registered' })
      }
    } else res.status(409).json({ Msg: 'Only users can be registered' })
  } catch (error) {
    res.status(400).json({ Msg: 'Error while register user' })
  }
}

exports.unsuscribeCourseUser = async (req, res) => {
  try {
    const { id, rol } = req.token
    if (rol === 'user') {
      const course = await courseModel.findById(req.params.courseId)
      const user = course.registered.indexOf(id)
      if (user !== -1) {
        course.registered.splice(user, 1)
        course.save()
        res.json(course)
      } else {
        res.status(409).json({ Msg: 'You are not register in this course' })
      }
    } else res.status(409).json({ Msg: 'Only users can be registered' })
  } catch (error) {
    res.status(400).json({ Msg: 'Unsuscribe user is NOT possible' })
  }
}
