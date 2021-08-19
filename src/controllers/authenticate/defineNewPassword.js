
const { updateUserPasswordWhereForgot, findOneUserForgotPassword } = require('../../database/repository/user')
const { validateBodyNewPassword, validateFoundedUser } = require('./case')
const { validateErrorBody } = require('../../presenters/handle')
const { generatePassword } = require('../../presenters/password')
const { generateToken } = require('../../presenters/jwt')

exports.path = '/reset_password/:forgot'
exports.method = 'PUT'
exports.middleware = [validateBodyNewPassword, validateErrorBody, validateFoundedUser]
exports.authenticate = false

exports.handler = async (req, res, next) => {
  try {
    const { password_one: passwordOne } = req.body
    const { forgot } = req.params
    const user = await findOneUserForgotPassword({ forgot })
    await updateUserPasswordWhereForgot({ forgot, password: generatePassword(passwordOne) })
    return res.status(200).json({ data: { token: generateToken(user.dataValues), user } })
  } catch (error) {
    next(error)
  }
}
