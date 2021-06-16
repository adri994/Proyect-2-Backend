const CompaniesModel = require('../models/companies.model')
const userModel = require('../models/users.model')

const isEmailCompany = async (email = '') => {
  let emailDB
  try {
    emailDB = await CompaniesModel.findOne({ email })
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
    const emailDB = await CompaniesModel.findOne({ email})
    if (!emailDB) return res.status(400).json({ msg: 'Usuario o contraseña son incorrectas' })
    req.user = emailDB
  } else {
    const emailDB = await userModel.findOne({ email })

    if (!emailDB) return res.status(400).json({ msg: 'Usuario o contraseña son incorrectas' })
    req.user = emailDB
  }
  next()
}

module.exports = {
  isEmailCompany,
  isEmailUser,
  validateDB
}
