const mongoose = require('mongoose')
const adminModel = require('../models/admins.model')
const userModel = require('../models/users.model')
const courseModel = require('../models/courses.model')
const jobModel = require('../models/offers.model')
const companyModel = require('../models/companies.model')
const bcrypt = require('bcrypt')
const { createJWT } = require('../utils/jwt')

exports.createAdmin = async (req, res) => {
  try {
    if (req.body.pass_admin === process.env.ADMIN_PASSWORD) {
      const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
      const HASHED_PWD2 = bcrypt.hashSync(req.body.password, 10)
      req.body.password = HASHED_PWD
      req.body.pass_admin = HASHED_PWD2
      req.body.admin = true
      const adminNew = await adminModel.create(req.body)
      res.json(adminNew)
    } else {
      res.json({ Error: 'Your admin password is wrong' })
    }
  } catch (error) {
    res.status(500).json({ Msg: 'Error admin account is NOT created' })
  }
}

exports.loginAdmin = async (req, res) => {
  adminModel
    .findOne({ username: req.body.username })
    .then(data => {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, result) => {
          if (err) throw new Error(err)
          if (!result) {
            return res.json({ Msg: 'Wrong username or password' })
          } else {
            createJWT(data._id).then(token => {
              const USER_DATA = { username: data.username }
              return res.json({ token, ...USER_DATA })
            })
              .catch(err => {
                console.log(err)
                res.status(500).json({ Msg: 'Error' })
              })
          }
        })
      } else res.status(500).json({ Msg: 'Wrong email or password' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ Msg: 'Error while login' })
    })
}

exports.signupUser = (req, res) => {
  const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
  req.body.password = HASHED_PWD
  userModel.create(req.body)
    .then(userNew => res.json({ name: userNew.name, email: userNew.email }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ Msg: 'Error' })
    })
}

exports.adminShowUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ Msg: 'Error while show users' })
  }
}

exports.adminDeleteUser = async (req, res) => {
  try {
    const userDel = await userModel.findByIdAndDelete(req.params.userId)
    res.json(userDel)
  } catch (error) {
    res.status(400).json({ Msg: 'Error email not found' })
  }
}

exports.adminUpdateUser = async (req, res) => {
  try {
    const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
    req.body.password = HASHED_PWD
    const userEdited = await userModel.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    res.json(userEdited)
  } catch (error) {
    res.status(400).json({ Msg: 'Error user not found' })
  }
}

exports.adminCreateCompany = async (req, res) => {
  const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
  req.body.password = HASHED_PWD
  companyModel.create(req.body)
    .then(companyNew => res.json({ name: companyNew.name, email: companyNew.email }))
    .catch(err => {
      console.log(err)
      res.status(500).json({ Msg: 'Error' })
    })
}

exports.adminShowCompanies = async (req, res) => {
  try {
    const companies = await companyModel.find()
    res.status(200).json(companies)
  } catch (error) {
    res.status(400).json({ Msg: 'Error while show companies' })
  }
}

exports.adminDeleteCompany = async (req, res) => {
  try {
    const [companyRemove] = await Promise.all([
      companyModel.findByIdAndDelete(req.params.companyId),
      courseModel.deleteMany({ id_company: req.params.companyId }),
      jobModel.deleteMany({ id_company: req.params.companyId })
    ])
    res.json(companyRemove)
  } catch (error) {
    res.status(400).json({ msg: 'Error while delete company' })
  }
}

exports.adminUpdateCompany = async (req, res) => {
  try {
    const HASHED_PWD = bcrypt.hashSync(req.body.password, 10)
    req.body.password = HASHED_PWD
    const companyEdited = await companyModel.findByIdAndUpdate(req.params.companyId, req.body, { new: true })
    res.json(companyEdited)
  } catch (error) {
    res.status(400).json({ Msg: 'Error company not found' })
  }
}

exports.adminShowCourses = async (req, res) => {
  try {
    const courses = await courseModel.find(req.query)
    res.status(200).json(courses)
  } catch (error) {
    res.status(400).json({ Msg: 'Error can not show courses' })
  }
}

exports.adminCreateCourse = async (req, res) => {
  const findCompany = await companyModel.findById(req.params.companyId)
  if (!findCompany) return res.status(404).json({ Msg: 'Error company not found' })
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

exports.adminDeleteCourse = async (req, res) => {
  try {
    const courseDel = await courseModel.findByIdAndDelete(req.params.courseId)
    res.json(courseDel)
  } catch (error) {
    res.status(400).json({ Msg: 'Course not found' })
  }
}

exports.adminUpdateCourse = async (req, res) => {
  const courseEdited = await courseModel.findByIdAndUpdate(req.params.courseId, req.body, { new: true })
  res.json(courseEdited)
}

exports.adminSuscribeCourse = async (req, res) => {
  try {
    const [findCourse, findUser] = await Promise.all([
      courseModel.findById(req.params.courseId),
      userModel.findOne(req.body)
    ])
    if (findCourse && findUser) {
      if (!findCourse.registered.includes(findUser._id)) {
        findCourse.registered.push(findUser._id)
        findCourse.save()
        res.json(findCourse)
      } else {
        res.status(409).json({ Msg: 'User already registered' })
      }
    }
  } catch (error) {
    res.status(400).json({ Msg: 'Error while register user' })
  }
}

exports.adminUnsuscribeCourse = async (req, res) => {
  try {
    const [findCourse, findUser] = await Promise.all([
      courseModel.findById(req.params.courseId),
      userModel.findOne(req.body)
    ])
    if (findCourse && findUser) {
      const user = findCourse.registered.indexOf(findUser._id)
      if (user !== -1) {
        findCourse.registered.splice(user, 1)
        findCourse.save()
        res.json(findCourse)
      } else {
        res.status(409).json({ Msg: 'User does not exist' })
      }
    }
  } catch (error) {
    res.status(400).json({ Msg: 'Error while unsuscribe user' })
  }
}

exports.adminShowOffers = async (req, res) => {
  try {
    const offers = await jobModel.find(req.query)
    res.status(200).json(offers)
  } catch (error) {
    res.status(400).json({ Msg: 'Error can not show courses' })
  }
}

exports.adminCreateOffer = async (req, res) => {
  const findCompany = await companyModel.findById(req.params.companyId)
  if (!findCompany) return res.status(404).json({ Msg: 'Error company not found' })
  try {
    req.body.id_company = mongoose.Types.ObjectId(req.params.companyId)
    const jobAdd = await jobModel.create(req.body)
    res.json(jobAdd)
  } catch (error) {
    res.status(400).json({ Msg: 'Error creating offer' })
  }
}

exports.adminDeleteOffer = async (req, res) => {
  try {
    const offerDel = await jobModel.findByIdAndDelete(req.params.offerId)
    res.json(offerDel)
  } catch (error) {
    res.status(400).json({ Msg: 'Offer not found' })
  }
}

exports.adminUpdateOffer = async (req, res) => {
  try {
    const offerEdited = await jobModel.findByIdAndUpdate(req.params.offerId, req.body, { new: true })
    res.json(offerEdited)
  } catch (error) {
    res.status(400).json({ Msg: 'Error user not found' })
  }
}

exports.adminSuscribeOffer = async (req, res) => {
  try {
    const [findOffer, findUser] = await Promise.all([
      jobModel.findById(req.params.offerId),
      userModel.findOne(req.body)
    ])
    if (findOffer && findUser) {
      if (!findOffer.applicants.includes(findUser._id)) {
        findOffer.applicants.push(findUser._id)
        findOffer.save()
        res.json(findOffer)
      } else {
        res.status(409).json({ Msg: 'User already registered' })
      }
    }
  } catch (error) {
    res.status(400).json({ Msg: 'Error while register user' })
  }
}

exports.adminUnsuscribeOffer = async (req, res) => {
  try {
    const [findOffer, findUser] = await Promise.all([
      jobModel.findById(req.params.offerId),
      userModel.findOne(req.body)
    ])
    if (findOffer && findUser) {
      const user = findOffer.applicants.indexOf(findUser._id)
      if (user !== -1) {
        findOffer.applicants.splice(user, 1)
        findOffer.save()
        res.json(findOffer)
      } else {
        res.status(409).json({ Msg: 'User does not exist' })
      }
    }
  } catch (error) {
    res.status(400).json({ Msg: 'Error while register user' })
  }
}
