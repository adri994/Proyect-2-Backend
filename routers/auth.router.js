const authRouter = require('express').Router()

const { check } = require('express-validator')
const {
  login,
  signup
} = require('../controllers/auth.controller')
const validateInput = require('../middleware/validateInput')
const { validateDB, isEmailCompany, isEmailUser } = require('../utils/validateData')

authRouter
  .post('/login', [
    check('email', 'debe ser un correo').isEmail(),
    check('password', 'inbcorrecto').isLength({ min: 6 }),
    check('rol', 'No existe ese rol').isIn(['user', 'company', undefined]),
    validateDB,
    validateInput
  ], login)

authRouter
  .post('/signup/user', [
    // Name
    check('name', 'tiene que tener nombre').not().isEmpty(),
    check('name', 'Tiene que ser mayor a uno letra').isLength({ min: 2 }),
    // LastName
    check('name', 'tiene que tener nombre').not().isEmpty(),
    check('name', 'Tiene que ser mayor a uno letra').isLength({ min: 2 }),
    // Email
    check('email', 'debe ser un correo').isEmail(),
    check('email').custom(isEmailUser),
    // Password
    check('password', 'inbcorrecto').isLength({ min: 6 }),
    // City
    check('island', 'Tiene que estar en canaria').isIn(['Tenerife', 'La Gomera', 'Lanzarote', 'Fuerteaventura', 'Gran Canaria', 'Hierro', 'La palma', '']),
    check('rol', 'Rol invalido').isIn(['user', undefined]),
    validateInput
  ], signup)

authRouter
  .post('/signup/company', [
    // Name
    check('name', 'tiene que tener nombre').not().isEmpty(),
    check('name', 'Tiene que ser mayor a uno letra').isLength({ min: 2 }),
    // Email
    check('email', 'tiene que tener nombre').not().isEmpty(),
    check('email', 'No es un email').isEmail(),
    check('email').custom(isEmailCompany),
    // Password
    check('password', 'Tiene que tener una longitud de 6').isLength({ min: 6 }),
    // Island
    check('island', 'Tiene que estar en canaria').isIn(['Tenerife', 'La Gomera', 'Lanzarote', 'Fuerteaventura', 'Gran Canaria', 'Hierro', 'La palma', '']),
    // Rol
    check('rol', 'Rol invalido').isIn(['company']),
    validateInput
  ], signup)

exports.authRouter = authRouter
