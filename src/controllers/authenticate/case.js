
const { findOneUserEmail, findOneUserForgotPassword } = require('../../database/repository/user')

const { body } = require('express-validator')

exports.validateBodyAuthenticate = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

exports.validateBodyReset = [
  body('email').isEmail()
]

exports.validateBodyDefinePassword = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

exports.validateBodyNewPassword = [
  body('password_one').isLength({ min: 6 }),
  body('password_two').isLength({ min: 6 }).custom((value, { req }) => {
    if (value !== req.body.password_one) throw new Error('As senhas não são iguais!')
    else return true
  })
]

/**
 * @function
 * @param  {any} req
 * @param  {any} res
 * @param  {any} next
 * @return {res | next}
 */
exports.validateUserExist = async (req, res, next) => {
  const { email } = req.body
  const validate = await findOneUserEmail({ email })
  if (!validate) return res.status(400).json({ errors: [{ title: 'Error', message: 'Usuário não encontrado!' }] })
  return next()
}

/**
 * @function
 * @param  {any} req
 * @param  {any} res
 * @param  {any} next
 * @return {res | next}
 */
exports.validateFoundedUser = async (req, res, next) => {
  const { forgot } = req.params
  const validate = await findOneUserForgotPassword({ forgot })
  if (!validate) return res.status(400).json({ errors: [{ title: 'Error', message: 'O código informado não é valido!' }] })
  return next()
}
