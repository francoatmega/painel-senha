const { Op } = require('sequelize')
const { findOne, update, create, findAllPaginate, remove } = require('../index')

exports.findOneUserIdInNotEmail = ({ id, email }) => {
  return findOne('User', { where: { [Op.not]: { id }, email }, attributes: { exclude: ['password', 'forgot'] }, raw: true })
}

exports.findOneUserIdInNotCpf = ({ id, cpf }) => {
  return findOne('User', { where: { [Op.not]: { id }, cpf }, attributes: { exclude: ['password', 'forgot'] }, raw: true })
}

exports.findOneUserEmail = ({ email }) => {
  return findOne('User', { where: { email }, attributes: { exclude: ['password', 'forgot'] }, raw: true })
}

exports.findOneUserCpf = ({ cpf }) => {
  return findOne('User', { where: { cpf }, attributes: { exclude: ['password', 'forgot'] }, raw: true })
}

exports.findAllPaginateUsers = (query, page = 1) => {
  return findAllPaginate('User', {
    where: { ...query },
    order: [['createdAt', 'DESC']],
    attributes: {
      exclude: ['password', 'forgot']
    }
  }, page)
}

exports.findOneUserForgotPassword = ({ forgot }) => {
  return findOne('User', {
    where: { forgot },
    attributes: { exclude: ['password', 'forgot'] }
  })
}

exports.findOneUser = (query) => {
  return findOne('User', {
    where: { ...query },
    attributes: { exclude: ['password', 'CompanyId', 'forgot'] }
  })
}

exports.findOneUserById = ({ id }) => {
  return findOne('User', {
    where: { id },
    attributes: { exclude: ['password', 'CompanyId', 'forgot'] }
  })
}

exports.createUser = ({ name, email, CompanyId = null, password, cpf, isAdmin = false }) => {
  return create('User', { name, email, CompanyId, password, cpf, isAdmin })
}

exports.updateUser = (query, data) => {
  return update('User', { where: { ...query } }, { ...data })
}

exports.updateUserSetCodeForgot = ({ forgot, id }) => {
  return update('User', { where: { id } }, { forgot })
}

exports.updateUserPasswordWhereForgot = ({ forgot, password }) => {
  return update('User', { where: { forgot } }, { password, forgot: '' })
}

exports.removeUser = (query) => {
  return remove('User', { where: { ...query } })
}
