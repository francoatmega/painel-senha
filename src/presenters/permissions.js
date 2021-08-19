
const { findOneUserById } = require('../database/repository/user')

const isPermissionAdministrator = async (req, res, next) => {
  const validatePermission = await findOneUserById({ id: req.user.id })
  if (!validatePermission || (validatePermission && !validatePermission.isAdmin)) return res.status(403).json({ errors: [{ title: 'Permissão!', message: 'Usuário não permissão para o ato!' }] })
  return next()
}

const isPermissionAdministratorBoolean = async ({ id }) => {
  const validatePermission = await findOneUserById({ id })
  if (!validatePermission) throw new Error('Not permission validate')
  return validatePermission.isAdmin
}

const isUserCompanyId = async (req, res, next) => {
  const permission = await isPermissionAdministratorBoolean({ id: req.user.id })

  if (!permission && !req.user.Company) return res.status(400).json({ errors: [{ title: 'Erro', message: 'Por favor se vincule a uma empresa!' }] })
  return next()
}

module.exports = { isPermissionAdministrator, isUserCompanyId, isPermissionAdministratorBoolean }
