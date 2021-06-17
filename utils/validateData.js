const companyModel = require('../models/companies.model')
const userModel = require('../models/users.model')

const isEmailCompany = async (email = '') => {
  let emailDB
  try {
    emailDB = await companyModel.findOne({ email })
  } catch (error) {

  }

  if (emailDB) throw new Error('Password confirmation is incorrect')
}

const isEmailUser = async (email = '') => {
  let emailDB
  try {
    emailDB = await userModel.findOne({ email })
  } catch (error) {

  }
  if (emailDB) throw new Error('Password confirmation is incorrect')
}

const validateDB = async (req, res, next) => {
  const { email, rol = 'user' } = req.body

  if (rol === 'company') {
    const emailDB = await companyModel.findOne({ email })
    if (!emailDB) return res.status(400).json({ msg: 'Wrong username or password' })
    req.user = emailDB
  } else {
    const emailDB = await userModel.findOne({ email })

    if (!emailDB) return res.status(400).json({ msg: 'Wrong username or password' })
    req.user = emailDB
  }
  next()
}

const isMongo = (req, res, next) =>{
  console.log(res.params)
}

module.exports = {
  isEmailCompany,
  isEmailUser,
  validateDB,
  isMongo
}
