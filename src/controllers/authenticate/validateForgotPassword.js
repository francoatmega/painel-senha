
const { validateFoundedUser } = require('./case')

exports.path = '/reset_password/:forgot/validate'
exports.method = 'GET'
exports.middleware = [validateFoundedUser]
exports.authenticate = false

exports.handler = async (_, res) => {
  return res.status(200).json({ data: { title: 'Código', message: 'Código valido!' } })
}
