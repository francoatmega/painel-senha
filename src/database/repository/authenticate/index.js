
const { findOne, models } = require('../index')

exports.findOneAuthenticate = ({ email, password }) => {
  return findOne('User', {
    where: { email, password },
    attributes: { exclude: ['password', 'forgot'] }
  })
}
