
const { findOneUserById } = require('../../database/repository/user')

exports.path = '/me'
exports.method = 'GET'
exports.middleware = []
exports.authenticate = true

exports.handler = async (req, res, next) => {
  try {
    const user = await findOneUserById({ id: req.user.id })
    if (!user) return res.status(403).json({ errors: [{ title: 'Token inválido!', message: 'Token informado é inválido!' }] })
    return res.status(200).json({ data: { user } })
  } catch (error) {
    next(error)
  }
}
