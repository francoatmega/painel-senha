
const { findOneUserEmail, updateUserSetCodeForgot } = require('../../database/repository/user')
const { validateBodyReset, validateUserExist } = require('./case')
const { validateErrorBody } = require('../../presenters/handle')
const { sendGridIntegrationEmail } = require('../../services/email')
const { template } = require('../../templates/email-reset-html')
const { generateCode } = require('../../presenters/generate')

exports.path = '/reset_password'
exports.method = 'POST'
exports.middleware = [validateBodyReset, validateErrorBody, validateUserExist]
exports.authenticate = false

exports.handler = async (req, res, next) => {
  try {
    const { email } = req.body
    const forgot = await generateCode()
    const user = await findOneUserEmail({ email })
    const html = template({ ...user, baseUrl: process.env.FRONT_BASE_URL, forgot })
    await sendGridIntegrationEmail({ to: user.email, subject: 'Esqueceu sua senha ?', html })
    await updateUserSetCodeForgot({ id: user.id, forgot })
    return res.status(200).json({ data: { title: 'Email', message: 'Email enviado!' } })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
